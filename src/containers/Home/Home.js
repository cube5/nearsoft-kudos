import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import domtoimage from "dom-to-image-chrome-fix";
// import domtoimage from "retina-dom-to-image";
import fileSaver from "file-saver";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";
import Container from "../../components/Container";
import Kudo from "../../components/Kudo";

const CREATE_KUDO = gql`
  mutation createKudo(
    $from: String!
    $to: String!
    $message: String!
    $imgSrc: String!
  ) {
    createKudo(from: $from, to: $to, message: $message, imgSrc: $imgSrc) {
      _id
      from
      to
      message
      imgSrc
      createdAt
    }
  }
`;

class Content extends Component {
  $kudo = createRef();

  onChangeTimeoutId = null;

  state = {
    from: "",
    to: "",
    message: "",
    imgSrc: "",
    loadingPreview: true
  };

  async componentDidMount() {
    const imgSrc = await this.getImgSrc();
    this.setState({ imgSrc, loadingPreview: false });
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
    this.setState({ loadingPreview: true });
    this.onChangeTimeoutId = setTimeout(async () => {
      const imgSrc = await this.getImgSrc();
      const { from, to, message } = data;
      this.setState({ from, to, message, imgSrc, loadingPreview: false });
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

  render() {
    const { classes } = this.props;
    const { from, to, message, imgSrc, loadingPreview } = this.state;

    return (
      <Container>
        <Grid container spacing={24} justify={"space-around"}>
          <Grid item>
            <Fragment>
              <Typography variant="display2" gutterBottom>
                Kudo
              </Typography>
              <Paper>
                <Kudo innerRef={this.$kudo} onChange={this.updatePreview} />
              </Paper>
            </Fragment>
          </Grid>
          <Grid item>
            <Fragment>
              <Typography variant="display2" gutterBottom>
                Preview
                {loadingPreview && <CircularProgress color="secondary" />}
              </Typography>
              <Paper>
                <div className={classes.previewContainer}>
                  <img src={imgSrc} alt="preview" width="100%" />
                </div>
              </Paper>
            </Fragment>
          </Grid>
        </Grid>
        <Mutation mutation={CREATE_KUDO}>
          {(createKudo, { loading, error, data }) => (
            <div className={classes.buttonContainer}>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                className={`${classes.button}`}
                disabled={loading}
                onClick={e => {
                  createKudo({
                    variables: {
                      from,
                      to,
                      message,
                      imgSrc
                    }
                  });
                }}
              >
                share
                <ShareIcon className={classes.icon} />
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          )}
        </Mutation>
      </Container>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
