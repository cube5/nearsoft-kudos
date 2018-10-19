import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import domtoimage from "dom-to-image-chrome-fix-retina"; // custom fork from dom-to-image-chrome-fix
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";
import Container from "../../components/Container";
import Kudo from "../../components/Kudo";
import KudoPreview from "../../components/Kudo/preview";
import CreateKudoButton from "../../components/CreateKudoButton";

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  $kudo = createRef();

  onChangeTimeoutId = null;

  state = {
    from: "",
    to: "",
    message: "",
    imgUrl: "",
    snackbarMessage: ""
  };

  async componentDidMount() {
    const imgUrl = await this.getImgUrl();
    this.setState({ imgUrl });
  }

  getImgUrl = async () => {
    try {
      const node = this.$kudo.current;
      const imgUrl = await domtoimage.toPng(node);
      return imgUrl;
    } catch (err) {
      console.error("Something went wrong getting the img src!", err);
    }
  };

  updatePreview = (e, data) => {
    clearTimeout(this.onChangeTimeoutId);
    this.onChangeTimeoutId = setTimeout(async () => {
      const imgUrl = await this.getImgUrl();
      const { from, to, message } = data;
      this.setState({ from, to, message, imgUrl });
    }, 300);
  };

  validate = () => {
    const { message } = this.state;
    if (!message) {
      this.setState({
        snackbarMessage: `Please fill message field.`
      });
      return false;
    }

    return true;
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarMessage: "" });
  };

  render() {
    const { from, to, message, imgUrl, snackbarMessage } = this.state;

    return (
      <Container>
        <Grid container spacing={24} justify={"space-around"}>
          <Grid item>
            <Fragment>
              <Typography variant="h2" gutterBottom>
                Kudo
              </Typography>
              <Paper>
                <Kudo innerRef={this.$kudo} onChange={this.updatePreview} />
              </Paper>
            </Fragment>
          </Grid>
          <Grid item>
            <Fragment>
              <Typography variant="h2" gutterBottom>
                Preview
              </Typography>
              <Paper>
                <KudoPreview imgUrl={imgUrl} />
              </Paper>
            </Fragment>
          </Grid>
        </Grid>
        <CreateKudoButton
          onValidate={this.validate}
          variables={{
            from,
            to,
            message,
            imgUrl
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!!snackbarMessage}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "notification-message"
          }}
          message={<span id="notification-message">{snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
