import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  container: {
    padding: "20px 30px"
  }
};

const Container = ({ classes, className, children }) => (
  <div className={`${classes.container} ${className || ""}`}>{children}</div>
);

export default withStyles(styles)(Container);
