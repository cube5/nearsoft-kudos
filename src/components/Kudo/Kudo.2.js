import "typeface-permanent-marker";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";
import { createStyled } from "../../utils";
import DraggableImage from "../DraggableImage";

const Styled = createStyled(styles);

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
      () => {
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
            {/*<div className={classes.header}>
              <Typography variant="display2">{header}</Typography>
            </div>*/}
            <div className={classes.paperContainer}>
              <div className={classes.messageContainer}>
                {/*<TextField
                  name="from"
                  placeholder="Me"
                  value={from}
                  onChange={this.handleChange}
                />*/}
                <textarea
                  rows="10"
                  name="message"
                  placeholder="Here goes the message"
                  value={message}
                  className={classes.message}
                  style={{
                    fontFamily: "'Permanent Marker', cursive"
                  }}
                  onChange={this.handleChange}
                />
                {/*<TextField
                  name="to"
                  placeholder="You"
                  value={to}
                  onChange={this.handleChange}
                />*/}
              </div>
            </div>
          </div>
        )}
      </Styled>
    );
  }
}

export default Kudo;
