import React, { Component } from "react";

import Node from "./node.jsx";

import "./grid.css";
import { dijkstra, getShortestPath } from "../../../services/dijkstra.js";
import {
  VisualizeContext,
  DIJKSTRA,
  ASTAR,
  BFS,
  DFS,
  RECURSIVEMAZE,
  SIMPLEMAZE,
  RANDOMDFS
} from "../../../context/selectionContext.js";
import {
  createGrid,
  clearGrid,
  getNewGridWithEndNodeMove,
  getNewGridWithStartNodeMove,
  getNewGridWithWallsToggle,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_COL
} from "./gridHelpers";

import moment from "moment";
import { aStarSearch } from "../../../services/astar.js";
import { buildRecursiveMaze } from "../../../services/mazes/recursiveMaze.js";
import { dfsSearch } from "../../../services/dfs.js";
import { buildSimpleMaze } from "../../../services/mazes/simpleMaze.js";

export default class Grid extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.available &&
      (nextProps.col_count !== prevState.COL_COUNT ||
        nextProps.row_count !== prevState.ROW_COUNT)
    ) {
      return {
        ...prevState,
        COL_COUNT: nextProps.col_count,
        ROW_COUNT: nextProps.row_count,
        grid: createGrid(nextProps.row_count, nextProps.col_count)
      };
    } else {
      return prevState;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      grid: createGrid(this.props.row_count, this.props.col_count),
      mousePressed: false,
      wallDrawing: false,
      moveStartNode: false,
      moveEndNode: false,
      curStartPos: [START_NODE_ROW, START_NODE_COL],
      curEndPos: [FINISH_NODE_ROW, FINISH_NODE_COL],
      computed: false,
      available: true,
      curAlgorithm: "",
      ROW_COUNT: this.props.row_count,
      COL_COUNT: this.props.col_count
    };
  }

  clear() {
    this.setState({
      grid: clearGrid(
        this.state.grid,
        this.state.ROW_COUNT,
        this.state.COL_COUNT
      ),
      mousePressed: false,
      wallDrawing: false,
      moveStartNode: false,
      moveEndNode: false,
      curStartPos: [START_NODE_ROW, START_NODE_COL],
      curEndPos: [FINISH_NODE_ROW, FINISH_NODE_COL],
      computed: false,
      available: true,
      curAlgorithm: ""
    });
  }

  clearWalls() {
    const { grid } = this.state;
    for (let row = 0; row < this.state.ROW_COUNT; row++) {
      for (let col = 0; col < this.state.COL_COUNT; col++) {
        if (
          grid[row][col].isStart ||
          grid[row][col].isFinish ||
          grid[row][col].isVisited
        )
          continue;
        else {
          if (grid[row][col].isWall) {
            grid[row][col].isWall = !grid[row][col].isWall;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-empty";
          }
        }
      }
    }
  }

  clearPath() {}

  handleMouseDown(row, col, enableVisualize) {
    if (enableVisualize || !this.state.available) return;
    if (this.state.grid[row][col].isStart) {
      //Move start nodes
      this.setState({ mousePressed: true, moveStartNode: true });
    } else if (this.state.grid[row][col].isFinish) {
      //Move end nodes
      this.setState({ mousePressed: true, moveEndNode: true });
    } else {
      //Make walls
      const newGrid = getNewGridWithWallsToggle(this.state.grid, row, col);
      if (newGrid === null) return;
      this.setState({ grid: newGrid, mousePressed: true, wallDrawing: true });
    }
  }
  handleMouseEnter(row, col, enableVisualize) {
    //console.log(`mouse enter ${this.state.mousePressed}`, row, col);
    if (!this.state.mousePressed || enableVisualize || !this.state.available)
      return;
    if (
      moment(Date.now()).diff(
        moment(this.state.grid[row][col].timestamp),
        "milisecond"
      ) < 200
    )
      return;
    if (this.state.moveStartNode) {
      const newGrid = getNewGridWithStartNodeMove(
        this.state.grid,
        row,
        col,
        this.state.curStartPos[0],
        this.state.curStartPos[1]
      );
      if (newGrid != null)
        this.setState({ grid: newGrid, curStartPos: [row, col] }, () => {
          if (this.state.computed) {
            this.reCalculateGrid();
          }
        });
    } else if (this.state.moveEndNode) {
      const newGrid = getNewGridWithEndNodeMove(
        this.state.grid,
        row,
        col,
        this.state.curEndPos[0],
        this.state.curEndPos[1]
      );
      if (newGrid != null)
        this.setState({ grid: newGrid, curEndPos: [row, col] }, () => {
          if (this.state.computed) {
            this.reCalculateGrid();
          }
        });
    } else if (this.state.wallDrawing) {
      const newGrid = getNewGridWithWallsToggle(this.state.grid, row, col);
      if (newGrid === null) return;
      this.setState({ grid: newGrid });
    }
  }
  handleMouseUp() {
    if (this.state.mousePressed)
      this.setState({
        mousePressed: false,
        wallDrawing: false,
        moveStartNode: false,
        moveEndNode: false
      });
  }

  reCalculateGrid() {
    console.log(this.state.curAlgorithm);
    const { grid } = this.state;
    for (let row = 0; row < this.state.ROW_COUNT; row++) {
      for (let col = 0; col < this.state.COL_COUNT; col++) {
        grid[row][col].distance = Infinity;
        grid[row][col].isVisited = false;
        grid[row][col].f = Infinity;
        grid[row][col].g = Infinity;
        grid[row][col].h = Infinity;
      }
    }
    var startPos = this.state.curStartPos;
    var endPos = this.state.curEndPos;
    const startNode = grid[startPos[0]][startPos[1]];
    const finishNode = grid[endPos[0]][endPos[1]];
    var visitedNodesInOrder;
    if (
      this.state.curAlgorithm === DIJKSTRA ||
      this.state.curAlgorithm === ASTAR
    ) {
      if (this.state.curAlgorithm === DIJKSTRA) {
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      } else if (this.state.curAlgorithm === ASTAR) {
        visitedNodesInOrder = aStarSearch(
          grid,
          startNode,
          finishNode,
          this.state.ROW_COUNT,
          this.state.COL_COUNT
        );
      }
      const shortestPath = getShortestPath(finishNode);
      if (!visitedNodesInOrder) return;
      for (const node of visitedNodesInOrder) {
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }
      for (const node of shortestPath) {
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }

      for (let row = 0; row < this.state.ROW_COUNT; row++) {
        for (let col = 0; col < this.state.COL_COUNT; col++) {
          if (
            !shortestPath.includes(this.state.grid[row][col]) &&
            !visitedNodesInOrder.includes(this.state.grid[row][col])
          ) {
            if (this.state.grid[row][col].isWall) {
              document.getElementById(`node-${row}-${col}`).className =
                "node node-wall";
            } else {
              document.getElementById(`node-${row}-${col}`).className =
                "node node-empty";
            }
          }
        }
      }
    } else {
      if (this.state.curAlgorithm === DFS) {
        visitedNodesInOrder = dfsSearch(
          grid,
          startNode,
          finishNode,
          this.state.ROW_COUNT,
          this.state.COL_COUNT,
          false
        );
      } else {
        visitedNodesInOrder = dfsSearch(
          grid,
          startNode,
          finishNode,
          this.state.ROW_COUNT,
          this.state.COL_COUNT,
          true
        );
      }

      for (const node of visitedNodesInOrder) {
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }
      for (let row = 0; row < this.state.ROW_COUNT; row++) {
        for (let col = 0; col < this.state.COL_COUNT; col++) {
          if (!visitedNodesInOrder.includes(this.state.grid[row][col])) {
            if (this.state.grid[row][col].isWall) {
              document.getElementById(`node-${row}-${col}`).className =
                "node node-wall";
            } else {
              document.getElementById(`node-${row}-${col}`).className =
                "node node-empty";
            }
          }
        }
      }
    }
  }

  animatePath(visitedNodesInOrder, shortestPath, toggleEnable) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath, toggleEnable);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited-animation";
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder, toggleEnable) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path-animation";
        }
        if (i === nodesInShortestPathOrder.length - 1) {
          if (toggleEnable) toggleEnable();
          this.setState({ computed: true, available: true });
        }
      }, 25 * i);
    }
  }

  visualizeDijkstra(toggleEnable) {
    const { grid } = this.state;
    var startPos = this.state.curStartPos;
    var endPos = this.state.curEndPos;
    const startNode = grid[startPos[0]][startPos[1]];
    const finishNode = grid[endPos[0]][endPos[1]];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const shortestPath = getShortestPath(finishNode);
    this.animatePath(visitedNodesInOrder, shortestPath, toggleEnable);
  }

  visualizeAstar(toggleEnable) {
    const { grid, curStartPos, curEndPos } = this.state;
    const startNode = grid[curStartPos[0]][curStartPos[1]];
    const endNode = grid[curEndPos[0]][curEndPos[1]];

    const v = aStarSearch(
      grid,
      startNode,
      endNode,
      this.state.ROW_COUNT,
      this.state.COL_COUNT
    );
    const shortestPath = getShortestPath(endNode);
    this.animatePath(v, shortestPath, toggleEnable);
    /* this.animateShortestPath(shortestPath, toggleEnable); */
  }

  visualizeDFS(toggleEnable, randomDFS) {
    const { grid, curStartPos, curEndPos } = this.state;
    const startNode = grid[curStartPos[0]][curStartPos[1]];
    const endNode = grid[curEndPos[0]][curEndPos[1]];

    const v = dfsSearch(
      grid,
      startNode,
      endNode,
      this.state.ROW_COUNT,
      this.state.COL_COUNT,
      randomDFS
    );
    this.animateShortestPath(v, toggleEnable);
    /* this.animateShortestPath(shortestPath, toggleEnable); */
  }

  visualizeMaze(toggleMaze) {
    setTimeout(() => {
      toggleMaze(null);
      this.setState({ available: true });
    }, 1000);
    return;
  }

  visualizeRecursiveMaze(toggleMaze) {
    this.setState({ available: false });
    const { grid, curStartPos, curEndPos } = this.state;
    const startNode = grid[curStartPos[0]][curStartPos[1]];
    const endNode = grid[curEndPos[0]][curEndPos[1]];
    const wallNodes = buildRecursiveMaze(
      grid,
      startNode,
      endNode,
      this.state.ROW_COUNT,
      this.state.COL_COUNT
    );

    for (let i = 0; i < wallNodes.length; i++) {
      setTimeout(() => {
        getNewGridWithWallsToggle(grid, wallNodes[i].row, wallNodes[i].col);
        if (!wallNodes[i].isStart && !wallNodes[i].isFinish) {
          document.getElementById(
            `node-${wallNodes[i].row}-${wallNodes[i].col}`
          ).className = "node node-wall";
        }
        if (i === wallNodes.length - 1) {
          toggleMaze(null);
          this.setState({ available: true });
        }
      }, i * 10);
    }
  }

  visualizeSimpleMaze(toggleMaze) {
    this.setState({ available: false });
    const { grid } = this.state;
    const wallNodes = buildSimpleMaze(
      grid,
      this.state.ROW_COUNT,
      this.state.COL_COUNT
    );

    for (let i = 0; i < wallNodes.length; i++) {
      setTimeout(() => {
        getNewGridWithWallsToggle(grid, wallNodes[i].row, wallNodes[i].col);
        if (!wallNodes[i].isStart && !wallNodes[i].isFinish) {
          document.getElementById(
            `node-${wallNodes[i].row}-${wallNodes[i].col}`
          ).className = "node node-wall";
        }
        if (i === wallNodes.length - 1) {
          toggleMaze(null);
          this.setState({ available: true });
        }
      }, i * 10);
    }
  }

  checkState(
    enableVisualize,
    algorithmSelected,
    toggleEnable,
    toggleClear,
    clearBoard,
    mazeSelected,
    toggleMaze,
    clearWalls,
    toggleClearWalls,
    clearPath,
    toggleClearPath
  ) {
    if (!(mazeSelected === null) && this.state.available) {
      if (mazeSelected === RECURSIVEMAZE)
        setTimeout(() => {
          this.clearWalls();
          setTimeout(() => {
            this.visualizeRecursiveMaze(toggleMaze);
          }, 10);
        }, 10);
      else if (mazeSelected === SIMPLEMAZE) {
        setTimeout(() => {
          this.clearWalls();
          setTimeout(() => {
            this.visualizeSimpleMaze(toggleMaze);
          }, 10);
        }, 10);
      }
      return;
    }

    if (enableVisualize) {
      if (algorithmSelected === DIJKSTRA) {
        setTimeout(() => {
          if (this.state.available) {
            if (this.state.computed) {
              this.clear();
              this.setState({
                available: false,
                curAlgorithm: DIJKSTRA
              });
            } else {
              this.setState({
                available: false,
                curAlgorithm: DIJKSTRA
              });
            }
            this.visualizeDijkstra(toggleEnable);
          }
        }, 10);
      } else if (algorithmSelected === ASTAR) {
        setTimeout(() => {
          if (this.state.available) {
            if (this.state.computed) {
              this.clear();
              this.setState({
                available: false,
                curAlgorithm: ASTAR
              });
            } else {
              this.setState({
                available: false,
                curAlgorithm: ASTAR
              });
            }
            this.visualizeAstar(toggleEnable);
          }
        }, 10);
      } else if (algorithmSelected === BFS) {
        setTimeout(() => {
          toggleEnable();
        }, 10);
      } else if (algorithmSelected === DFS || algorithmSelected === RANDOMDFS) {
        setTimeout(() => {
          if (this.state.available) {
            if (this.state.computed) {
              this.clear();
              this.setState({
                available: false,
                curAlgorithm: algorithmSelected
              });
            } else {
              this.setState({
                available: false,
                curAlgorithm: algorithmSelected
              });
            }
            if (algorithmSelected === RANDOMDFS)
              this.visualizeDFS(toggleEnable, true);
            else this.visualizeDFS(toggleEnable, false);
          }
        }, 10);
      } else {
        setTimeout(() => {
          toggleEnable();
        }, 10);
      }
    } else if (clearBoard) {
      setTimeout(() => {
        toggleClear();
        this.clear();
      }, 10);
    } else if (clearPath) {
      setTimeout(() => {
        toggleClearPath();
      }, 10);
    } else if (clearWalls) {
      setTimeout(() => {
        toggleClearWalls();
        this.clearWalls();
        console.log("DASD", this.state.curAlgorithm);
        if (this.state.curAlgorithm != null && this.state.curAlgorithm != "") {
          this.setState({}, () => {
            this.reCalculateGrid();
          });
        }
      }, 10);
    }
  }

  render() {
    const renderGrid = this.state.grid;
    return (
      <VisualizeContext.Consumer>
        {({
          enableVisualize,
          algorithmSelected,
          toggleEnable,
          toggleClear,
          clearBoard,
          mazeSelected,
          toggleMaze,
          clearWalls,
          toggleClearWalls,
          clearPath,
          toggleClearPath
        }) => {
          if (this.state.available)
            this.checkState(
              enableVisualize,
              algorithmSelected,
              toggleEnable,
              toggleClear,
              clearBoard,
              mazeSelected,
              toggleMaze,
              clearWalls,
              toggleClearWalls,
              clearPath,
              toggleClearPath
            );
          return (
            <table className="grid">
              <tbody>
                {renderGrid.map((row, rowId) => {
                  return (
                    <tr id={rowId} key={rowId}>
                      {row.map((node, nodeIdx) => {
                        return (
                          <Node
                            key={nodeIdx}
                            isStart={node.isStart}
                            isFinish={node.isFinish}
                            isVisited={node.isVisited}
                            isWall={node.isWall}
                            row={node.row}
                            col={node.col}
                            onMouseDown={(row, col) =>
                              this.handleMouseDown(row, col, enableVisualize)
                            }
                            onMouseEnter={(row, col) =>
                              this.handleMouseEnter(row, col, enableVisualize)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                          ></Node>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }}
      </VisualizeContext.Consumer>
    );
  }
}
