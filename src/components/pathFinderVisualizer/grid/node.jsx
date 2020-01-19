import React, { Component } from "react";

import "./node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      isStart,
      isFinish,
      isWall,
      row,
      col,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "node-empty";
    return (
      <td
        id={`node-${row}-${col}`}
        key={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></td>
    );
  }
}
