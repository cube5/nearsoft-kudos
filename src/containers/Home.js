import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import domtoimage from "dom-to-image-chrome-fix";
import fileSaver from "file-saver";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Container from "../components/Container";
import Kudo from "../components/Kudo";
import { saveKudo } from "../api";
import { realWorldKudoHeight, realWorldKudoWidth } from "../constants";

const styles = theme => ({
  buttonContainer: {
    position: "relative",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      marginTop: 45
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 10
    }
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit,
    marginDown: theme.spacing.unit,
    [theme.breakpoints.up("xs")]: {
      width: "50%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  previewContainer: {
    width: `${realWorldKudoWidth}mm`,
    height: `${realWorldKudoHeight}mm`,
    maxWidth: `${realWorldKudoWidth}mm`,
    maxHeight: `${realWorldKudoHeight}mm`
  }
});

class Content extends Component {
  $kudo = createRef();

  onChangeTimeoutId = null;

  state = {
    from: "",
    to: "",
    message: "",
    header: "Great Job!",
    imgSrc: "",
    loading: true,
    saving: false,
    success: false
  };

  async componentDidMount() {
    const imgSrc = await this.getImgSrc();
    this.setState({ imgSrc, loading: false });
  }

  getImgSrc = async () => {
    try {
      const node = this.$kudo.current;
      const imgSrc = await domtoimage.toPng(node);
      return imgSrc;
    } catch (err) {
      console.error("wtf, something went wrong getting the img src!", err);
    }
  };

  getImgBlob = async () => {
    try {
      const node = this.$kudo.current;
      const blob = await domtoimage.toBlob(node);
      return blob;
    } catch (err) {
      console.error("wtf, something went wrong getting the blob!", err);
    }
  };

  updatePreview = (e, data) => {
    clearTimeout(this.onChangeTimeoutId);
    this.setState({ loading: true });
    this.onChangeTimeoutId = setTimeout(async () => {
      const imgSrc = await this.getImgSrc();
      const { from, to, message } = data;
      this.setState({ from, to, message, imgSrc, loading: false });
    }, 500);
  };

  exportToImage = async e => {
    try {
      const blob = await this.getImgBlob();
      fileSaver.saveAs(blob, "kudo.png");
    } catch (err) {
      console.error("wtf, something went wrong!", err);
    }
  };

  save = async e => {
    try {
      this.setState({ saving: true });

      const { from, to, message, imgSrc } = this.state;
      const result = saveKudo({ from, to, message, imgSrc });
      this.setState({ saving: false, success: true });
    } catch (err) {
      console.error("wtf, something went wrong!", err);
    }
  };

  render() {
    const { classes } = this.props;
    const { header, imgSrc, loading, saving, success } = this.state;

    return (
      <Container>
        <Grid container spacing={24} justify={"space-around"}>
          <Grid item>
            <Fragment>
              <Typography variant="display2" gutterBottom>
                Kudo
              </Typography>
              <Paper>
                <Kudo
                  header={header}
                  innerRef={this.$kudo}
                  onChange={this.updatePreview}
                />
              </Paper>
            </Fragment>
          </Grid>
          <Grid item>
            <Fragment>
              <Typography variant="display2" gutterBottom>
                Preview
                {loading && <CircularProgress color="secondary" />}
              </Typography>
              <Paper>
                <div className={classes.previewContainer}>
                  <img src={imgSrc} alt="preview" />
                </div>
              </Paper>
            </Fragment>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button
            size="large"
            color="secondary"
            variant="outlined"
            className={`${classes.button} ${
              success ? classes.buttonSuccess : null
            }`}
            disabled={saving}
            onClick={this.save}
          >
            share
            <ShareIcon className={classes.icon} />
          </Button>
          {saving && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Container>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
