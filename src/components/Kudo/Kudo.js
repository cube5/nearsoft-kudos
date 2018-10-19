import "typeface-permanent-marker";
import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles";
import { createStyled } from "../../utils";

const Styled = createStyled(styles);

class Kudo extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    message: PropTypes.string,
    innerRef: PropTypes.any,
    onChange: PropTypes.func
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
    const { innerRef, from, to, message } = this.props;

    return (
      <Styled>
        {({ classes }) => (
          <div ref={innerRef} className={classes.root}>
            <div className={classes.paperContainer}>
              <div className={classes.messageContainer}>
                <input
                  type="text"
                  name="to"
                  value={to}
                  placeholder="To"
                  className={classes.to}
                  onChange={this.handleChange}
                />
                <textarea
                  rows="10"
                  name="message"
                  placeholder="Here goes the message"
                  value={message}
                  className={classes.message}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="from"
                  value={from}
                  placeholder="From"
                  className={classes.from}
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
