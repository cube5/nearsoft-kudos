import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { realWorldKudoHeight, realWorldKudoWidth } from "../../constants";

const styles = {
  previewContainer: {
    width: `${realWorldKudoWidth}mm`,
    height: `${realWorldKudoHeight}mm`,
    maxWidth: `${realWorldKudoWidth}mm`,
    maxHeight: `${realWorldKudoHeight}mm`
  }
};

const Preview = ({ classes, imgUrl }) => (
  <div className={classes.previewContainer}>
    <img src={imgUrl} alt="kudo preview" width="100%" />
  </div>
);

export default withStyles(styles)(Preview);
