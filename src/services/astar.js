export function aStarSearch(grid, startNode, finishNode, ROW_COUNT, COL_COUNT) {
  const openList = [];
  const closedList = [];
  const closedListInOrder = [];
  var currNode;
  for (let i = 0; i < ROW_COUNT; i++) {
    const row = [];
    for (let j = 0; j < COL_COUNT; j++) {
      row.push(false);
    }
    closedList.push(row);
  }
  startNode.f = 0;
  startNode.g = 0;
  startNode.h = 0;

  openList.push(startNode);
  var foundEnd = false;

  while (openList.length !== 0) {
    if (openList.length > 0) {
      openList.sort(function(a, b) {
        return a.f - b.f;
      });
    }
    currNode = openList.shift();

    closedList[currNode.row][currNode.col] = true;
    closedListInOrder.push(currNode);

    //North case
    if (isValid(currNode.row - 1, currNode.col, ROW_COUNT, COL_COUNT)) {
      if (isEnding(currNode.row - 1, currNode.col, grid)) {
        foundEnd = true;
        grid[currNode.row - 1][currNode.col].previousNode = currNode;

        break;
      } else if (
        !closedList[currNode.row - 1][currNode.col] &&
        !isBlocked(currNode.row - 1, currNode.col, grid)
      ) {
        const gNew = currNode.g + 1.0;
        const hNew = calculateHValueManhattan(
          grid[currNode.row - 1][currNode.col],
          finishNode
        );
        const fNew = gNew + hNew;

        if (
          grid[currNode.row - 1][currNode.col].f === Infinity ||
          grid[currNode.row - 1][currNode.col].f > fNew
        ) {
          //Not in Open List add it
          //update Values
          openList.push(grid[currNode.row - 1][currNode.col]);
          grid[currNode.row - 1][currNode.col].f = fNew;
          grid[currNode.row - 1][currNode.col].g = gNew;
          grid[currNode.row - 1][currNode.col].h = hNew;
          grid[currNode.row - 1][currNode.col].previousNode = currNode;
        }
      }
    }

    //South Case
    if (isValid(currNode.row + 1, currNode.col, ROW_COUNT, COL_COUNT)) {
      if (isEnding(currNode.row + 1, currNode.col, grid)) {
        foundEnd = true;
        grid[currNode.row + 1][currNode.col].previousNode = currNode;

        break;
      } else if (
        !closedList[currNode.row + 1][currNode.col] &&
        !isBlocked(currNode.row + 1, currNode.col, grid)
      ) {
        const gNew = currNode.g + 1.0;
        const hNew = calculateHValueManhattan(
          grid[currNode.row + 1][currNode.col],
          finishNode
        );
        const fNew = gNew + hNew;

        if (
          grid[currNode.row + 1][currNode.col].f === Infinity ||
          grid[currNode.row + 1][currNode.col].f > fNew
        ) {
          //Not in Open List add it
          //update Values
          openList.push(grid[currNode.row + 1][currNode.col]);
          grid[currNode.row + 1][currNode.col].f = fNew;
          grid[currNode.row + 1][currNode.col].g = gNew;
          grid[currNode.row + 1][currNode.col].h = hNew;
          grid[currNode.row + 1][currNode.col].previousNode = currNode;
        }
      }
    }

    //East Case
    if (isValid(currNode.row, currNode.col + 1, ROW_COUNT, COL_COUNT)) {
      if (isEnding(currNode.row, currNode.col + 1, grid)) {
        foundEnd = true;
        grid[currNode.row][currNode.col + 1].previousNode = currNode;

        break;
      } else if (
        !closedList[currNode.row][currNode.col + 1] &&
        !isBlocked(currNode.row, currNode.col + 1, grid)
      ) {
        const gNew = currNode.g + 1.0;
        const hNew = calculateHValueManhattan(
          grid[currNode.row][currNode.col + 1],
          finishNode
        );
        const fNew = gNew + hNew;

        if (
          grid[currNode.row][currNode.col + 1].f === Infinity ||
          grid[currNode.row][currNode.col + 1].f > fNew
        ) {
          //Not in Open List add it
          //update Values
          openList.push(grid[currNode.row][currNode.col + 1]);
          grid[currNode.row][currNode.col + 1].f = fNew;
          grid[currNode.row][currNode.col + 1].g = gNew;
          grid[currNode.row][currNode.col + 1].h = hNew;
          grid[currNode.row][currNode.col + 1].previousNode = currNode;
        }
      }
    }

    //West Case
    if (isValid(currNode.row, currNode.col - 1, ROW_COUNT, COL_COUNT)) {
      if (isEnding(currNode.row, currNode.col - 1, grid)) {
        foundEnd = true;
        grid[currNode.row][currNode.col - 1].previousNode = currNode;

        break;
      } else if (
        !closedList[currNode.row][currNode.col - 1] &&
        !isBlocked(currNode.row, currNode.col - 1, grid)
      ) {
        const gNew = currNode.g + 1.0;
        const hNew = calculateHValueManhattan(
          grid[currNode.row][currNode.col - 1],
          finishNode
        );
        const fNew = gNew + hNew;

        if (
          grid[currNode.row][currNode.col - 1].f === Infinity ||
          grid[currNode.row][currNode.col - 1].f > fNew
        ) {
          //Not in Open List add it
          //update Values
          openList.push(grid[currNode.row][currNode.col - 1]);
          grid[currNode.row][currNode.col - 1].f = fNew;
          grid[currNode.row][currNode.col - 1].g = gNew;
          grid[currNode.row][currNode.col - 1].h = hNew;
          grid[currNode.row][currNode.col - 1].previousNode = currNode;
        }
      }
    }
  }

  if (!foundEnd) return null;
  else {
    closedListInOrder.push(finishNode);
    return closedListInOrder;
  }
}

function isValid(i, j, ROW_COUNT, COL_COUNT) {
  return i >= 0 && j >= 0 && i < ROW_COUNT && j < COL_COUNT ? true : false;
}

function isBlocked(i, j, grid) {
  return grid[i][j].isWall ? true : false;
}

function isEnding(i, j, grid) {
  return grid[i][j].isFinish ? true : false;
}

function calculateHValueManhattan(curNode, finishNode) {
  return (
    Math.abs(curNode.row - finishNode.row) +
    Math.abs(curNode.col - finishNode.col)
  );
}
