export const ROW_COUNT = 25;
export const COL_COUNT = 51;
export const START_NODE_ROW = 5;
export const START_NODE_COL = 5;
export const FINISH_NODE_ROW = 5;
export const FINISH_NODE_COL = 15;

export const createGrid = () => {
  const grid = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow = [];
    for (let col = 0; col < COL_COUNT; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const clearGrid = grid => {
  const newGrid = grid.slice();
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (START_NODE_ROW === row && START_NODE_COL === col) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-start";
      } else if (FINISH_NODE_ROW === row && FINISH_NODE_COL === col) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-finish";
      } else {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-empty";
      }
      const newNode = {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        timestamp: Date.now(),
        f: Infinity,
        g: Infinity, 
        h: Infinity
      };
      newGrid[row][col] = newNode;
    }
  }
  return newGrid;
};

export const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    timestamp: Date.now(),
    f: Infinity,
    g: Infinity,
    h: Infinity
  };
};

export const getNewGridWithWallsToggle = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish) return null;
  const newGrid = grid.slice();

  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    timestamp: Date.now()
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNewGridWithStartNodeMove = (
  grid,
  row,
  col,
  prevStartRow,
  prevStartCol
) => {
  const newGrid = grid.slice();
  if (newGrid[row][col].isFinish) return null;
  const node = newGrid[prevStartRow][prevStartCol];
  const newPrevNode = { ...node, isStart: false, timestamp: Date.now() };
  
  if (newPrevNode.isWall){
    document.getElementById(`node-${prevStartRow}-${prevStartCol}`).className =
    "node node-wall";
  }
  else{
    document.getElementById(`node-${prevStartRow}-${prevStartCol}`).className =
    "node node-empty";
  }
  const node2 = newGrid[row][col];
  const newNode = {
    ...node2,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    isStart: true,
    timestamp: Date.now()
  };
  document.getElementById(`node-${row}-${col}`).className = "node node-start";
  newGrid[prevStartRow][prevStartCol] = newPrevNode;
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNewGridWithEndNodeMove = (
  grid,
  row,
  col,
  prevStartRow,
  prevStartCol
) => {
  const newGrid = grid.slice();
  if (newGrid[row][col].isStart) return null;
  const node = newGrid[prevStartRow][prevStartCol];
  const newPrevNode = { ...node, isFinish: false, timestamp: Date.now() };
  if (newPrevNode.isWall){
    document.getElementById(`node-${prevStartRow}-${prevStartCol}`).className =
    "node node-wall";
  }
  else{
    document.getElementById(`node-${prevStartRow}-${prevStartCol}`).className =
    "node node-empty";
  }
  const node2 = newGrid[row][col];
  const newNode = {
    ...node2,
    isFinish: true,
    isVisited: false,
    previousNode: null,
    distance: Infinity,
    timestamp: Date.now()
  };
  document.getElementById(`node-${row}-${col}`).className = "node node-finish";
  newGrid[prevStartRow][prevStartCol] = newPrevNode;
  newGrid[row][col] = newNode;
  return newGrid;
};
