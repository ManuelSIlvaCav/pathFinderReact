import React from "react";

export const DIJKSTRA = "Dijkstra";
export const ASTAR = "A*";

export const DFSMAZE = "DFSMAZE";
export const RECURSIVEMAZE = "RECURSIVEMAZE";

export const visualizeState = {
  algorithmSelected: DIJKSTRA,
  enableVisualize: false,
  toggleAlgorithm: () => {},
  toggleEnable: () => {},
  toggleClear: () => {},
  completedVisualize: false,
  clearBoard: false,
  mazeSelected: null,
  toggleMaze: () => {}
};

export const VisualizeContext = React.createContext(visualizeState);
