import "typeface-permanent-marker";
import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import domtoimage from "dom-to-image-chrome-fix-retina"; // custom fork from dom-to-image-chrome-fix
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";
import Container from "../../components/Container";
import Kudo from "../../components/Kudo";
import CreateKudoButton from "../../components/CreateKudoButton";

export const CREATE_KUDO = gql`
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
        <CreateKudoButton
          variables={{
            from,
            to,
            message,
            imgUrl
          }}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
