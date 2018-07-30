import "typeface-permanent-marker";
import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import domtoimage from "dom-to-image-chrome-fix-retina"; // custom fork from dom-to-image-chrome-fix
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShareIcon from "@material-ui/icons/Share";

import styles from "./styles";
import Container from "../../components/Container";
import Kudo from "../../components/Kudo";

const CREATE_KUDO = gql`
  mutation createKudo(
    $from: String!
    $to: String!
    $message: String!
    $imgUrl: String!
  ) {
    createKudo(from: $from, to: $to, message: $message, imgUrl: $imgUrl) {
      _id
      from
      to
      message
      imgUrl
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
    imgUrl: "",
    loadingPreview: true
  };

  async componentDidMount() {
    const imgUrl = await this.getImgUrl();
    this.setState({ imgUrl, loadingPreview: false });
  }

  getImgUrl = async () => {
    try {
      const node = this.$kudo.current;
      const imgUrl = await domtoimage.toPng(node);
      return imgUrl;
    } catch (err) {
      console.error("wtf, something went wrong getting the img src!", err);
    }
  };

  updatePreview = (e, data) => {
    clearTimeout(this.onChangeTimeoutId);
    this.setState({ loadingPreview: true });
    this.onChangeTimeoutId = setTimeout(async () => {
      const imgUrl = await this.getImgUrl();
      const { from, to, message } = data;
      this.setState({ from, to, message, imgUrl, loadingPreview: false });
    }, 500);
  };

  render() {
    const { classes } = this.props;
    const { from, to, message, imgUrl, loadingPreview } = this.state;

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
                  <img src={imgUrl} alt="preview" width="100%" />
                </div>
              </Paper>
            </Fragment>
          </Grid>
        </Grid>
        <Mutation mutation={CREATE_KUDO}>
          {(createKudo, { loading, error, data }) => (
            <div className={classes.buttonContainer}>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                className={`${classes.button} ${
                  data ? classes.buttonSuccess : ""
                }`}
                disabled={loading}
                onClick={e => {
                  createKudo({
                    variables: {
                      from,
                      to,
                      message,
                      imgUrl
                    }
                  });
                }}
              >
                {!data ? (!loading ? "save" : "saving") : "saved"}
                {!data ? (
                  !loading ? (
                    <CloudUploadIcon className={classes.icon} />
                  ) : (
                    <CloudQueueIcon className={classes.icon} />
                  )
                ) : (
                  <CloudDoneIcon className={classes.icon} />
                )}
              </Button>
              {data && (
                <Typography
                  style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "0 auto"
                  }}
                >
                  <TextField
                    fullWidth
                    value={data.createKudo.imgUrl}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShareIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Typography>
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
