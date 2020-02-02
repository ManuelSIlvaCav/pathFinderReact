import React from "react";

import Grid from "./grid/grid.jsx";
import TopNavBar from "./navBar/topNavBar.jsx";
import { WindowContext } from "../../context/windowContext.js";

export default function PathFinderVisualizer() {
  return (
    <WindowContext.Consumer>
      {({ row_count, col_count }) => {
        return (
          <>
            <TopNavBar />
            <Grid row_count={row_count} col_count={col_count} />
          </>
        );
      }}
    </WindowContext.Consumer>
  );
}
