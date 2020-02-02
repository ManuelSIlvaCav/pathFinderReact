export function dfsSearch(
  grid,
  startNode,
  finishNode,
  ROW_COUNT,
  COL_COUNT,
  isRandom
) {
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (!grid[row][col].isWall) {
        grid[row][col].isVisited = false;
        grid[row][col].previousNode = null;
      }
    }
  }

  var sortedVisistedNodes = dfsUtil(
    grid,
    startNode,
    finishNode,
    ROW_COUNT,
    COL_COUNT,
    isRandom
  );
  return sortedVisistedNodes;
}

function dfsUtil(grid, node, finishNode, ROW_COUNT, COL_COUNT, isRandom) {
  var neighbors = [];
  var curNode;
  var sortedVisistedNodes = [];
  neighbors.push(node);
  while (neighbors !== 0) {
    curNode = neighbors.pop();
    curNode.isVisited = true;
    sortedVisistedNodes.push(curNode);
    if (isEnding(curNode, finishNode)) return sortedVisistedNodes;
    var ns = getNeighbors(grid, curNode, ROW_COUNT, COL_COUNT, isRandom);
    //console.log("NEI of ", curNode.row, curNode.col, "== ", ns);
    ns.forEach(function(arrayItem) {
      neighbors.push(arrayItem);
    });
  }
  return sortedVisistedNodes;
}

function isEnding(curNode, finishNode) {
  if (curNode.row === finishNode.row && curNode.col === finishNode.col)
    return true;
  return false;
}

function getNeighbors(grid, node, ROW_COUNT, COL_COUNT, isRandom) {
  var neighbors = [];
  //Right
  if (
    isValid(node.row + 1, node.col, ROW_COUNT, COL_COUNT) &&
    !isBlocked(node.row + 1, node.col, grid) &&
    !isVisited(node.row + 1, node.col, grid)
  ) {
    neighbors.push(grid[node.row + 1][node.col]);
  }
  //Left
  if (
    isValid(node.row - 1, node.col, ROW_COUNT, COL_COUNT) &&
    !isBlocked(node.row - 1, node.col, grid) &&
    !isVisited(node.row - 1, node.col, grid)
  ) {
    neighbors.push(grid[node.row - 1][node.col]);
  }
  //Top
  if (
    isValid(node.row, node.col + 1, ROW_COUNT, COL_COUNT) &&
    !isBlocked(node.row, node.col + 1, grid) &&
    !isVisited(node.row, node.col + 1, grid)
  ) {
    neighbors.push(grid[node.row][node.col + 1]);
  }
  //Bot
  if (
    isValid(node.row, node.col - 1, ROW_COUNT, COL_COUNT) &&
    !isBlocked(node.row, node.col - 1, grid) &&
    !isVisited(node.row, node.col - 1, grid)
  ) {
    neighbors.push(grid[node.row][node.col - 1]);
  }
  if (isRandom) return shuffle(neighbors);
  else return neighbors;
}

function isValid(i, j, ROW_COUNT, COL_COUNT) {
  return i >= 0 && j >= 0 && i < ROW_COUNT && j < COL_COUNT ? true : false;
}

function isBlocked(i, j, grid) {
  return grid[i][j].isWall ? true : false;
}

function isVisited(i, j, grid) {
  return grid[i][j].isVisited;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
