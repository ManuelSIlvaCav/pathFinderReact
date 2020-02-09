import React, { Component } from "react";
import "./App.css";
import PathFinderVisualizer from "./components/pathFinderVisualizer/pathFinderVisualizer";

import {
  visualizeState,
  VisualizeContext
} from "./context/selectionContext.js";

import { WindowContext } from "./context/windowContext.js";

import "bootstrap/dist/css/bootstrap.min.css";
import useWindowDimensions from "./windowsSize";

const Main = () => {
  const { height, width } = useWindowDimensions();

  const { row_count, col_count } = getCounts(height, width);
  return (
    <WindowContext.Provider value={{ row_count, col_count }}>
      <App />
    </WindowContext.Provider>
  );
};

function getCounts(height, width) {
  var row_count;
  var col_count;

  var xSize = Math.floor((width)/ 25) - 0;
  var ySize = Math.floor((height) / 25) - 10;
  row_count = ySize % 2 === 0 ? ySize - 1 : ySize;
  col_count = xSize % 2 === 0 ? xSize - 1 : xSize;
  return { row_count, col_count };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleAlgorithm = algorithm => {
      this.setState(state => ({
        algorithmSelected: algorithm
      }));
    };

    this.toggleMaze = maze => {
      this.setState(state => ({
        mazeSelected: maze
      }));
    };

    this.toggleEnable = () => {
      this.setState(state => ({
        enableVisualize: !state.enableVisualize
      }));
    };

    this.toggleClear = () => {
      this.setState(state => ({
        clearBoard: !state.clearBoard,
        algorithmSelected: ""
      }));
    };

    this.toggleClearWalls = () => {
      this.setState(state => ({
        clearWalls: !state.clearWalls
      }));
    };

    this.toggleClearPath = () => {
      this.setState(state => ({
        clearPath: !state.clearPath
      }));
    };

    this.state = {
      algorithmSelected: visualizeState.algorithmSelected,
      enableVisualize: visualizeState.enableVisualize,
      toggleAlgorithm: this.toggleAlgorithm,
      toggleEnable: this.toggleEnable,
      toggleClear: this.toggleClear,
      clearBoard: false,
      mazeSelected: visualizeState.mazeSelected,
      toggleMaze: this.toggleMaze,
      clearWalls: false,
      toggleClearWalls: this.toggleClearWalls,
      clearPath: false,
      toggleClearPath: this.toggleClearPath
    };
  }

  render() {
    return (
      <VisualizeContext.Provider value={this.state}>
        <PathFinderVisualizer />
      </VisualizeContext.Provider>
    );
  }
}

export default Main;
