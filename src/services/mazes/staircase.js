export function buildStairCaseMaze(grid, ROW_COUNT, COL_COUNT) {
  var wallsNodeOrder = [];
  var row_aux = ROW_COUNT - 2;
  var dirTop = true;
  for (let col = 1; col < COL_COUNT - 1; col++) {
    wallsNodeOrder.push(grid[row_aux][col]);
    if (row_aux === 1) {
      dirTop = !dirTop;
    } else if (row_aux === ROW_COUNT - 2 && !dirTop) {
      dirTop = !dirTop;
    }
    if (dirTop) row_aux -= 1;
    else row_aux += 1;
  }
  return wallsNodeOrder;
}
