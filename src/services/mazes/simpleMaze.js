export function buildSimpleMaze(grid, ROW_COUNT, COL_COUNT) {
  var wallsNodeOrder = [];
  var action = true;
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (isWallMade()) wallsNodeOrder.push(grid[row][col]);
    }
    action = !action;
  }
  return wallsNodeOrder;
}

function isWallMade() {
  if (Math.random() >= 0.7) return true;
  return false;
}
