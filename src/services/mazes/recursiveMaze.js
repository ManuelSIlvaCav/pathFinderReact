import {
  ROW_COUNT,
  COL_COUNT
} from "../../components/pathFinderVisualizer/grid/gridHelpers";
import { invalid } from "moment";

export function buildRecursiveMaze(grid, startNode, endNode, width, height) {
  //Paint all the borders
  //call recursive Maze
  var wallsNodeOrder = [];

  for (let col = 0; col < COL_COUNT; col++) {
    wallsNodeOrder.push(grid[0][col]);
  }
  var colIndex = 0;
  for (let row = 0; row < ROW_COUNT - 1; row++) {
    wallsNodeOrder.push(grid[row][colIndex]);
    if (row === ROW_COUNT - 2 && colIndex === 0) {
      row = 0;
      colIndex = COL_COUNT - 1;
    }
  }
  for (let col = 0; col < COL_COUNT; col++) {
    wallsNodeOrder.push(grid[ROW_COUNT - 1][col]);
  }

  recursiveMaze(
    grid,
    startNode,
    endNode,
    COL_COUNT - 2,
    ROW_COUNT - 2,
    1,
    1,
    wallsNodeOrder
  );

  return wallsNodeOrder;
}

function recursiveMaze(
  grid,
  startNode,
  endNode,
  maxCol,
  maxRow,
  minCol,
  minRow,
  wallsNodeOrder,
  prevDirection,
  invalidNode
) {
  if (maxCol - minCol < 2 || maxRow - minRow < 2) return;
  const horizontalChance = [0, 1];
  var isHorizontal = Math.floor(Math.random() * horizontalChance.length);
  if (prevDirection){ isHorizontal = !prevDirection}
  //const isHorizontal =0;
  var pos = selectRandomNode(
    grid,
    isHorizontal,
    maxCol,
    maxRow,
    minCol,
    minRow,
    prevDirection,
    invalidNode
  );
  if (pos === null) {
    isHorizontal = !isHorizontal;
    pos = selectRandomNode(
      grid,
      isHorizontal,
      maxCol,
      maxRow,
      minCol,
      minRow,
      prevDirection,
      invalidNode
    );
  }

  const opening = selectRandomOpening(
    grid,
    maxCol,
    maxRow,
    minCol,
    minRow,
    isHorizontal
  );

  if (isHorizontal) {
    for (let col = minCol; col <= maxCol; col++) {
      if (col !== opening) wallsNodeOrder.push(grid[pos][col]);
    }
    recursiveMaze(
      grid,
      startNode,
      endNode,
      maxCol,
      pos - 1,
      minCol,
      minRow,
      wallsNodeOrder,
      isHorizontal,
      opening
    );

    recursiveMaze(
      grid,
      startNode,
      endNode,
      maxCol,
      maxRow,
      minCol,
      pos + 1,
      wallsNodeOrder,
      isHorizontal,
      opening
    );
  } else {
    for (let row = minRow; row <= maxRow; row++) {
      if (row !== opening) wallsNodeOrder.push(grid[row][pos]);
    }
    recursiveMaze(
      grid,
      startNode,
      endNode,
      maxCol,
      maxRow,
      pos + 1,
      minRow,
      wallsNodeOrder,
      isHorizontal,
      opening
    );

    recursiveMaze(
      grid,
      startNode,
      endNode,
      pos - 1,
      maxRow,
      minCol,
      minRow,
      wallsNodeOrder,
      isHorizontal,
      opening
    );
  }
}

function selectRandomNode(
  grid,
  isHorizontal,
  maxCol,
  maxRow,
  minCol,
  minRow,
  prevDirection,
  invalidNode
) {
  var rowPos;
  var colPos;
  var options;
  var indexPos;
  var offLoop = true;
  if (isHorizontal) {
    options = pairsFromRange(minRow, maxRow);
    indexPos = Math.floor(Math.random() * options.length);
    rowPos = options[indexPos];
    if (
      validPos(
        grid,
        rowPos,
        colPos,
        maxCol,
        maxRow,
        minCol,
        minRow,
        isHorizontal,
        prevDirection,
        invalidNode
      )
    ) {
      return rowPos;
    }

    while (offLoop) {
      if (options.length === 0) return null;
      if (
        validPos(
          grid,
          rowPos,
          colPos,
          maxCol,
          maxRow,
          minCol,
          minRow,
          isHorizontal,
          prevDirection,
          invalidNode
        )
      ) {
        offLoop = false;
      } else {
        for (let i = 0; i < options.length; i++) {
          if (i === indexPos) {
            options.splice(i, 1);
            i--;
          }
        }
        indexPos = Math.floor(Math.random() * options.length);
        rowPos = options[indexPos];
      }
    }

    return rowPos;
  } else {
    options = pairsFromRange(minCol, maxCol);
    indexPos = Math.floor(Math.random() * options.length);
    colPos = options[indexPos];
    if (
      validPos(
        grid,
        rowPos,
        colPos,
        maxCol,
        maxRow,
        minCol,
        minRow,
        isHorizontal,
        prevDirection,
        invalidNode
      )
    ) {
      return colPos;
    }

    while (offLoop) {
      if (options.length === 0) return null;
      if (
        validPos(
          grid,
          rowPos,
          colPos,
          maxCol,
          maxRow,
          minCol,
          minRow,
          isHorizontal,
          prevDirection,
          invalidNode
        )
      ) {
        offLoop = false;
      } else {
        for (let i = 0; i < options.length; i++) {
          if (i === indexPos) {
            options.splice(i, 1);
            i--;
          }
        }
        indexPos = Math.floor(Math.random() * options.length);
        colPos = options[indexPos];
      }
    }

    return colPos;
  }
}
function selectRandomOpening(
  grid,
  maxCol,
  maxRow,
  minCol,
  minRow,
  isHorizontal
) {
  var allRange = [];
  var indexPos;
  if (isHorizontal) {
    for (let i = minCol ; i < maxCol; i++) {
      if (i % 2 === 0) continue;
      allRange.push(i);
    }
    indexPos = allRange[Math.floor(Math.random() * allRange.length)];
    return indexPos;
  } else {
    for (let i = minRow ; i < maxRow; i++) {
      if (i % 2 === 0) continue;
      allRange.push(i);
    }
    indexPos = allRange[Math.floor(Math.random() * allRange.length)];

    return indexPos;
  }
}

function validPos(
  grid,
  row,
  col,
  maxCol,
  maxRow,
  minCol,
  minRow,
  isHorizontal,
  prevDirection,
  invalidNode
) {
  
  
  if (isHorizontal) {
    if (isHorizontal ^ prevDirection) {
      if (row === invalidNode) return false;
    }
    if ((maxRow - row) % 2 === 1 && (row - minRow) % 2 === 1) {
      return true;
    }
    return false;
  } else {
    if (isHorizontal ^ prevDirection) {
      if (col === invalidNode) return false;
    }
    if ((maxCol - col) % 2 === 1 && (col - minCol) % 2 === 1) {
      return true;
    }
    return false;
  }
}

function pairsFromRange(min, max) {
  var pairArray = [];
  for (let i = min; i <= max; i++) {
    if (i % 2 === 0) pairArray.push(i);
  }

  return pairArray;
}
