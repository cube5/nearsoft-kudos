import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "@material-ui/core/LinearProgress";

const Loading = ({ error, pastDelay }) => (
  <LinearProgress color={"secondary"} />
);

export default options =>
  Loadable({
    loading: () => <Loading />,
    ...options
  });
