import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { createStyled } from "../../utils";
import DraggableImage from "../DraggableImage";

const Styled = createStyled(theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 500,
    [theme.breakpoints.up("md")]: {
      minWidth: 400
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px 4px 0px 0px",
    padding: 40
  },
  paperContainer: {
    position: "relative",
    width: "100%",
    minHeight: 300,
    maxHeight: 300,
    margin: "0 auto",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  paperContent: {
    position: "absolute",
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
    background: "linear-gradient(transparent, transparent 28px, #91d1d3 28px)",
    backgroundSize: "30px 30px"
  },
  message: {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "100%",
    lineHeight: "30px",
    padding: "2px 10px",
    border: 0,
    outline: 0,
    background: "transparent",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 18,
    boxSizing: "border-box",
    zIndex: 1,
    resize: "none"
  },
  meta: {
    padding: 20
  },
  metaLabel: {
    opacity: 0.5,
    width: 30
  }
}));

class Kudo extends Component {
  static propTypes = {
    header: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    message: PropTypes.string,
    innerRef: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    header: "Great Job!"
  };

  state = {
    from: "",
    to: "",
    message: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      function setStateCallback() {
        if (typeof this.props.onChange === "function") {
          const { from, to, message } = this.state;
          const data = { from, to, message };
          this.props.onChange(e, data);
        }
      }
    );
  };

  render() {
    const { innerRef, header, from, to, message, onChange } = this.props;

    return (
      <Styled>
        {({ classes }) => (
          <div ref={innerRef} className={classes.root}>
            {/*<DraggableImage
        onStop={(e, data) => {
          const { from, to, message } = this.state;
          onChange(e, { from, to, message });
        }}
      />*/}
            <div className={classes.header}>
              <Typography variant="display2">{header}</Typography>
            </div>
            <div className={classes.paperContainer}>
              <div className={classes.paperContent}>
                <textarea
                  rows="10"
                  name="message"
                  placeholder="Start typing"
                  value={message}
                  className={classes.message}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <Divider />

            <div className={classes.meta}>
              <div>
                <Typography
                  component="span"
                  className={classes.metaLabel}
                  style={{ display: "inline-block", marginRight: 10 }}
                >
                  from:
                </Typography>
                <TextField
                  name="from"
                  placeholder="Me"
                  value={from}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <Typography
                  component="span"
                  className={classes.metaLabel}
                  style={{
                    display: "inline-block",
                    marginRight: 10,
                    textAlign: "right"
                  }}
                >
                  to:
                </Typography>
                <TextField
                  name="to"
                  placeholder="You"
                  value={to}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </Styled>
    );
  }
}

export default Kudo;
// export default withStyles(styles)(Kudo);
