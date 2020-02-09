import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import "./docBar.css";

export function DocBar() {
  return (
    <div id="documentation" key="documentation" className="documentation">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-wall"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>Wall Node</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-start"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>Start Node</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-visited"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>Visited Node</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-finish"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>End Node</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}></Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-shortest-path"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>Visited Node</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <div className="row">
              <div className="column">
                <div className="node node-empty"></div>
              </div>
              <div className="spacer"></div>
              <div className="column">
                <div>Empty Node</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
