import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FaceIcon from "@material-ui/icons/TagFaces";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";
import Twemoji from "../Twemoji";

const SUBMIT_FEEDBACK = gql`
  mutation createFeedback($message: String!, $rating: Rating!) {
    createFeedback(message: $message, rating: $rating) {
      message
      rating
    }
  }
`;

class Feedback extends Component {
  state = {
    open: false,
    anchorEl: null,
    rating: "",
    message: "",
    isFeedbackSent: false
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      open: !state.open,
      anchorEl: currentTarget
    }));
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleClickAway = () => this.setState({ open: false });

  render() {
    const { classes } = this.props;
    const { open, anchorEl, message, rating, isFeedbackSent } = this.state;
    return (
      <div className={classes.root}>
        <Button
          size="medium"
          variant="outlined"
          className={classes.feedbackTrigger}
          aria-describedby={"feedback"}
          onClick={this.handleClick}
        >
          Feedback
        </Button>
        <Popper
          id={"feedback"}
          open={open}
          anchorEl={anchorEl}
          placement={"bottom-end"}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              {isFeedbackSent ? (
                <Paper className={classes.feedback}>
                  <Typography>Thanks for you feedback!</Typography>
                </Paper>
              ) : (
                <Paper className={classes.feedback}>
                  <TextField
                    name="message"
                    rows="6"
                    rowsMax="6"
                    placeholder="Feedback, ideas, bugs..."
                    value={message}
                    onChange={this.handleChange}
                    multiline
                  />
                  <div className={classes.controls}>
                    <Select
                      name="rating"
                      value={rating}
                      onChange={this.handleChange}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <FaceIcon />
                      </MenuItem>
                      <MenuItem value="GOD">
                        <Twemoji emoji={"🤩"} />
                      </MenuItem>
                      <MenuItem value="GOOD">
                        <Twemoji emoji={"😄"} />
                      </MenuItem>
                      <MenuItem value="REGULAR">
                        <Twemoji emoji={"😕"} />
                      </MenuItem>
                      <MenuItem value="SHIT">
                        <Twemoji emoji={"🤮"} />
                      </MenuItem>
                    </Select>
                    <Mutation mutation={SUBMIT_FEEDBACK}>
                      {createFeedback => (
                        <Button
                          color="default"
                          variant="outlined"
                          disabled={!message}
                          onClick={event => {
                            createFeedback({
                              variables: {
                                message,
                                rating
                              }
                            });
                            this.setState(
                              {
                                message: "",
                                rating: "",
                                isFeedbackSent: true
                              },
                              () => {
                                setTimeout(() => {
                                  this.setState({
                                    open: false,
                                    isFeedbackSent: false
                                  });
                                }, 3000);
                              }
                            );
                          }}
                        >
                          submit
                        </Button>
                      )}
                    </Mutation>
                  </div>
                </Paper>
              )}
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

export default withStyles(styles)(Feedback);
