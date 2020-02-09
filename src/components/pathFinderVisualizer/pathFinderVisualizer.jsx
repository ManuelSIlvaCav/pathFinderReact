import React from "react";

import GridView from "./grid/grid.jsx";
import TopNavBar from "./navBar/topNavBar.jsx";
import {DocBar} from './navBar/docBar.jsx';
import { WindowContext } from "../../context/windowContext.js";

export default function PathFinderVisualizer() {
  return (
    <WindowContext.Consumer>
      {({ row_count, col_count }) => {
        return (
          <>
            <TopNavBar />
            <DocBar />
            <GridView row_count={row_count} col_count={col_count} />
          </>
        );
      }}
    </WindowContext.Consumer>
  );
}
