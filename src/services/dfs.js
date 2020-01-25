import {
  ROW_COUNT,
  COL_COUNT
} from "../components/pathFinderVisualizer/grid/gridHelpers";

export function dfsSearch(grid, startNode, finishNode) {
  var sortedVisistedNodes = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (!grid[row][col].isWall) {
        grid[row][col].isVisited = false;
        grid[row][col].previousNode = null;
      }
    }
  }

  dfsUtil(grid, startNode, finishNode, null, sortedVisistedNodes);
}

function dfsUtil(grid, node, finishNode, previousNode, sortedVisistedNodes) {
  var neighbors = [];
  if (isEnding(node, finishNode)) {
    node.previousNode = previousNode;
    return;
  }
  neighbors = getNeighbors(grid, node);
  if (neighbors.length === 0) return;
  while (neighbors.length !== 0) {
    const nextNode = neighbors.shift();
    nextNode.isVisited = true;
    sortedVisistedNodes.push(nextNode);
    dfsUtil(grid, nextNode, finishNode, node, sortedVisistedNodes);
  }
}

function isEnding(curNode, finishNode) {
  if (curNode.row === finishNode.row && curNode.col === finishNode.col)
    return true;
  return false;
}

function getNeighbors(grid, node) {
  var neighbors = [];
  //Right
  if (
    isValid(node.row + 1, node.col, grid) &&
    !isBlocked(node.row + 1, node.col, grid)
  ) {
    neighbors.push(grid[node.row + 1][node.col]);
  }
  //Left
  if (
    isValid(node.row - 1, node.col, grid) &&
    !isBlocked(node.row - 1, node.col, grid)
  ) {
    neighbors.push(grid[node.row - 1][node.col]);
  }
  //Top
  if (
    isValid(node.row, node.col + 1, grid) &&
    !isBlocked(node.row, node.col + 1, grid)
  ) {
    neighbors.push(grid[node.row][node.col - 1]);
  }
  //Bot
  if (
    isValid(node.row, node.col - 1, grid) &&
    !isBlocked(node.row, node.col - 1, grid)
  ) {
    neighbors.push(grid[node.row][node.col - 1]);
  }
}

function isValid(i, j, grid) {
  return i >= 0 && j >= 0 && i < ROW_COUNT && j < COL_COUNT ? true : false;
}

function isBlocked(i, j, grid) {
  return grid[i][j].isWall ? true : false;
}
