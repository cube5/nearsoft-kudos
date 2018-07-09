import React, { Component } from "react";
import Draggable from "react-draggable";
import Typography from "@material-ui/core/Typography";

export default class extends Component {
  state = {
    dragged: false
  };

  handleStart = (e, data) => {
    this.setState({ dragged: true });

    if (typeof this.props.onStart === "function") {
      this.props.onStart(e, data);
    }
  };

  render() {
    const { dragged } = this.state;

    return (
      <Draggable {...this.props} onStart={this.handleStart}>
        <div
          style={{
            zIndex: 1,
            cursor: "move",
            position: "relative"
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              left: "50%",
              position: "absolute"
            }}
          >
            <img
              draggable="false"
              alt="kudos asset"
              src="https://abs.twimg.com/emoji/v2/svg/1f4a9.svg"
            />
            {!dragged && <Typography>Drag me!</Typography>}
          </div>
        </div>
      </Draggable>
    );
  }
}
