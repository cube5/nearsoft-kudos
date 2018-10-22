import React, { Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { SW_CONTENT_CACHED, SW_CONTENT_AVAILABLE } from "../constants";

class ServiceWorkerNotifications extends Component {
  state = {
    isContentCached: false,
    isContentAvailable: false
  };

  componentDidMount() {
    document.addEventListener(SW_CONTENT_CACHED, this.openContentCachedMsg);
    document.addEventListener(
      SW_CONTENT_AVAILABLE,
      this.openContentAvailableMsg
    );
  }

  componentWillUnmount() {
    document.removeEventListener(SW_CONTENT_CACHED, this.openContentCachedMsg);
    document.removeEventListener(
      SW_CONTENT_AVAILABLE,
      this.openContentAvailableMsg
    );
  }

  openContentCachedMsg = () => this.setState({ isContentCached: true });
  openContentAvailableMsg = () => this.setState({ isContentAvailable: true });

  closeContentCachedMsg = () => this.setState({ isContentCached: false });
  closeContentAvailableMsg = () => this.setState({ isContentAvailable: false });

  render() {
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.isContentCached}
          autoHideDuration={5000}
          onClose={this.closeContentCachedMsg}
          ContentProps={{
            "aria-describedby": "notification-message"
          }}
          message={
            <span id="notification-message">
              Content is cached for offline use.
            </span>
          }
          action={
            <Button
              color="secondary"
              size="small"
              onClick={this.closeContentCachedMsg}
            >
              OK
            </Button>
          }
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.isContentAvailable}
          onClose={this.closeContentAvailableMsg}
          ContentProps={{
            "aria-describedby": "notification-message"
          }}
          message={
            <span id="notification-message">
              New version is available; please update.
            </span>
          }
          action={
            <Button
              color="secondary"
              size="small"
              onClick={() => window.location.reload(true)}
            >
              UPDATE
            </Button>
          }
        />
      </Fragment>
    );
  }
}

export default ServiceWorkerNotifications;
