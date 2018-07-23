import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "@material-ui/core/LinearProgress";

const Loading = ({ error, retry, pastDelay, timedOut }) => {
  if (error) {
    console.error("Error loading component", error);
    return null;
  }

  return <LinearProgress color={"secondary"} />;
};

export default options =>
  Loadable({
    loading: Loading,
    ...options
  });
