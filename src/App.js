import React, { Component } from "react";
import "./App.css";
import PathFinderVisualizer from "./components/pathFinderVisualizer/pathFinderVisualizer";

import {
  visualizeState,
  VisualizeContext
} from "./context/selectionContext.js";

import "bootstrap/dist/css/bootstrap.min.css";

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

    this.state = {
      algorithmSelected: visualizeState.algorithmSelected,
      enableVisualize: visualizeState.enableVisualize,
      toggleAlgorithm: this.toggleAlgorithm,
      toggleEnable: this.toggleEnable,
      toggleClear: this.toggleClear,
      clearBoard: false,
      mazeSelected: visualizeState.mazeSelected,
      toggleMaze: this.toggleMaze
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

export default App;
