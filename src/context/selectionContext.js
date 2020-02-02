import React from "react";

export const DIJKSTRA = "Dijkstra";
export const ASTAR = "A*";
export const BFS = "BFS";
export const DFS = "DFS";
export const RANDOMDFS = "RANDOMDFS";

export const DFSMAZE = "DFSMAZE";
export const RECURSIVEMAZE = "RECURSIVEMAZE";
export const SIMPLEMAZE = "SIMPLEMAZE";

export const visualizeState = {
  algorithmSelected: DIJKSTRA,
  enableVisualize: false,
  toggleAlgorithm: () => {},
  toggleEnable: () => {},
  toggleClear: () => {},
  completedVisualize: false,
  clearBoard: false,
  mazeSelected: null,
  toggleMaze: () => {},
  clearWalls: false,
  toggleClearWalls: () => {},
  clearPath: false,
  toggleClearPath: () => {}
};

export const VisualizeContext = React.createContext(visualizeState);
