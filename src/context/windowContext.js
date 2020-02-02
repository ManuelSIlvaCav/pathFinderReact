import React from "react";

export const windowState = {
  START_NODE_ROW: 5,
  START_NODE_COL: 5,
  FINISH_NODE_ROW: 15,
  FINISH_NODE_COL: 30
};

export const WindowContext = React.createContext(windowState);
