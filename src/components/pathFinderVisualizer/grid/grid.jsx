import React, { Component } from "react";

import Node from "./node.jsx";

import "./grid.css";
import { dijkstra, getShortestPath } from "../../../services/dijkstra.js";
import {
  VisualizeContext,
  DIJKSTRA,
  ASTAR
} from "../../../context/selectionContext.js";
import {
  createGrid,
  clearGrid,
  getNewGridWithEndNodeMove,
  getNewGridWithStartNodeMove,
  getNewGridWithWallsToggle,
  ROW_COUNT,
  COL_COUNT,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_COL
} from "./gridHelpers";

import moment from "moment";
import { aStarSearch } from "../../../services/astar.js";
import { buildRecursiveMaze } from "../../../services/mazes/recursiveMaze.js";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: createGrid(),
      mousePressed: false,
      wallDrawing: false,
      moveStartNode: false,
      moveEndNode: false,
      curStartPos: [START_NODE_ROW, START_NODE_COL],
      curEndPos: [FINISH_NODE_ROW, FINISH_NODE_COL],
      computed: false,
      available: true,
      curAlgorithm: ""
    };
  }

  clear() {
    this.setState({
      grid: clearGrid(this.state.grid),
      mousePressed: false,
      wallDrawing: false,
      moveStartNode: false,
      moveEndNode: false,
      curStartPos: [START_NODE_ROW, START_NODE_COL],
      curEndPos: [FINISH_NODE_ROW, FINISH_NODE_COL],
      computed: false,
      available: true
    });
  }

  handleMouseDown(row, col, enableVisualize) {
    if (enableVisualize || !this.state.available ) return;
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
    const { grid } = this.state;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        grid[row][col].distance = Infinity;
        grid[row][col].isVisited = false;
        grid[row][col].f = Infinity;
        grid[row][col].g = Infinity;
        grid[row][col].h = Infinity
        
      }
    }
    var startPos = this.state.curStartPos;
    var endPos = this.state.curEndPos;
    const startNode = grid[startPos[0]][startPos[1]];
    const finishNode = grid[endPos[0]][endPos[1]];
    var visitedNodesInOrder;
    if (this.state.curAlgorithm === DIJKSTRA) {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    } else if (this.state.curAlgorithm === ASTAR) {
      visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);
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

    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
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
      }, 50 * i);
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

  //TODO visualize astar
  visualizeAstar(toggleEnable) {
    
    const { grid, curStartPos, curEndPos } = this.state;
    const startNode = grid[curStartPos[0]][curStartPos[1]];
    const endNode = grid[curEndPos[0]][curEndPos[1]];

    const v = aStarSearch(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    this.animatePath(v, shortestPath, toggleEnable);
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
    this.setState({available: false});
    const { grid, curStartPos, curEndPos } = this.state;
    const startNode = grid[curStartPos[0]][curStartPos[1]];
    const endNode = grid[curEndPos[0]][curEndPos[1]];
    const wallNodes = buildRecursiveMaze(
      grid,
      startNode,
      endNode,
      ROW_COUNT,
      COL_COUNT
    );

    for (let i = 0; i < wallNodes.length; i++) {
      setTimeout(() => {
        getNewGridWithWallsToggle(grid, wallNodes[i].row, wallNodes[i].col);
        if (!wallNodes[i].isStart && !wallNodes[i].isFinish){
          document.getElementById(
            `node-${wallNodes[i].row}-${wallNodes[i].col}`
          ).className = "node node-wall";
        }
        if (i === wallNodes.length - 1) {
          toggleMaze(null);
          this.setState({available: true});
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
    toggleMaze
  ) {
    if (!(mazeSelected === null) && this.state.available) {
      setTimeout(() => {
        this.visualizeRecursiveMaze(toggleMaze);
      }, 10);
      return;
    }

    if (enableVisualize) {
      if (algorithmSelected === DIJKSTRA) {
        setTimeout(() => {
          if (this.state.available) {
            if (this.state.computed) {
              this.clear();
              this.setState({
                available: false
              });
              this.visualizeDijkstra(toggleEnable);
            } else {
              this.setState({
                available: false,
                curAlgorithm: DIJKSTRA
              });
              this.visualizeDijkstra(toggleEnable);
            }
          }
        }, 10);
      } else if (algorithmSelected === ASTAR) {
        setTimeout(() => {
          if (this.state.available) {
            if (this.state.computed) {
              this.clear();
              this.setState({
                available: false
              });
              this.visualizeAstar(toggleEnable);
            } else {
              this.setState({
                available: false,
                curAlgorithm: ASTAR
              });
              this.visualizeAstar(toggleEnable);
            }
          }
        }, 10);
      }
    } else if (clearBoard) {
      setTimeout(() => {
        toggleClear();
        this.clear();
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
          toggleMaze
        }) => {
          if (this.state.available)
            this.checkState(
              enableVisualize,
              algorithmSelected,
              toggleEnable,
              toggleClear,
              clearBoard,
              mazeSelected,
              toggleMaze
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
