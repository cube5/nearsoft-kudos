import React, { Fragment } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./containers/Home";
import Kudos from "./containers/Kudos";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
  // palette: {
  //   primary: deepOrange,
  //   secondary: blueGrey
  // }
});

export default () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Fragment>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/kudos"
          component={Kudos}
          // render={() => <div>Here go the kudos</div>}
        />
      </Fragment>
    </BrowserRouter>
  </MuiThemeProvider>
);
