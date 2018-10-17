import "typeface-roboto";
import React, { Fragment } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import CssBaseline from "@material-ui/core/CssBaseline";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";

import Header from "./components/Header";
import Loadable from "./components/Loadable";
import ServiceWorkerNotifications from "./components/ServiceWorkerNotifications";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  typography: { useNextVariants: true }
});

const AsyncHome = Loadable({
  loader: () => import("./containers/Home")
});

const AsyncKudos = Loadable({
  loader: () => import("./containers/Kudos")
});

export default () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Header />
          <Route exact path="/" component={AsyncHome} />
          <Route exact path="/kudos" component={AsyncKudos} />
          <ServiceWorkerNotifications />
        </Fragment>
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>
);
