import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
/* import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
*/
import Button from "react-bootstrap/Button";
import {
  VisualizeContext,
  DIJKSTRA,
  ASTAR,
  DFS, BFS,
  RECURSIVEMAZE
} from "../../../context/selectionContext";

export default class TopNavBar extends Component {
  setAlgorithm(selection) {
    this.props.algorithmSelectHandler(selection);
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">PathFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <AlgorithmDropDown />
            <MazeAndPatterns />
            <LoadingButton />
            <ClearTab />
            <Nav.Link >Clear Walls</Nav.Link>;
            <Nav.Link >Clear Path</Nav.Link>;
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function AlgorithmDropDown() {
  return (
    <VisualizeContext.Consumer>
      {({ algorithmSelected, toggleAlgorithm }) => {
        return (
          <NavDropdown title={"Algorithm"} id="basic-nav-dropdown">
            <NavDropdown.Item
              onSelect={() => {
                toggleAlgorithm(DIJKSTRA);
              }}
            >
              Dijkstra
            </NavDropdown.Item>
            <NavDropdown.Item
              onSelect={() => {
                toggleAlgorithm(ASTAR);
              }}
            >
              A* Algorithm
            </NavDropdown.Item>
            <NavDropdown.Item
              onSelect={() => {
                toggleAlgorithm(BFS);
              }}
            >
              BFS
            </NavDropdown.Item>
            <NavDropdown.Item
              onSelect={() => {
                toggleAlgorithm(DFS);
              }}
            >
              DFS
            </NavDropdown.Item>
            
          </NavDropdown>
        );
      }}
    </VisualizeContext.Consumer>
  );
}

function LoadingButton() {
  const handleClick = toggleEnable => {
    toggleEnable();
  };

  return (
    <VisualizeContext.Consumer>
      {({ algorithmSelected, toggleEnable, enableVisualize }) => {
        return (
          <Button
            variant="primary"
            disabled={enableVisualize}
            onClick={
              !enableVisualize
                ? () => {
                    handleClick(toggleEnable);
                  }
                : null
            }
          >
            {enableVisualize ? "Loading…" : "Run " + algorithmSelected}
          </Button>
        );
      }}
    </VisualizeContext.Consumer>
  );
}

function ClearTab() {
  return (
    <VisualizeContext.Consumer>
      {({ toggleClear }) => {
        return <Nav.Link onClick={toggleClear}>Clear Board</Nav.Link>;
      }}
    </VisualizeContext.Consumer>
  );
}

function MazeAndPatterns() {
  return (
    <VisualizeContext.Consumer>
      {({ toggleMaze }) => {
        return (
          <NavDropdown title={"Mazes & Patterns"} id="basic-nav-dropdown">
            <NavDropdown.Item onSelect={() => toggleMaze(RECURSIVEMAZE)}>
              Recursive Division
            </NavDropdown.Item>
          </NavDropdown>
        );
      }}
    </VisualizeContext.Consumer>
  );
}
