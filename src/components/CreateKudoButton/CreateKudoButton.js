import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShareIcon from "@material-ui/icons/Share";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";
import CREATE_KUDO from "../../graphql/mutations/CREATE_KUDO";

const CreateKudoButton = ({
  classes,
  onValidate,
  variables: { from, to, message, location, imgUrl }
}) => (
  <Mutation mutation={CREATE_KUDO}>
    {(createKudo, { loading, error, data }) => (
      <div className={classes.buttonContainer}>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        <Button
          size="large"
          color="secondary"
          variant="outlined"
          className={`${classes.button} ${data ? classes.buttonSuccess : ""}`}
          disabled={loading}
          onClick={e => {
            if (onValidate()) {
              createKudo({
                variables: {
                  from,
                  to,
                  message,
                  location,
                  imgUrl
                }
              });
            }
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
          <div className={classes.shareableLink}>
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
          </div>
        )}
      </div>
    )}
  </Mutation>
);

CreateKudoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onValidate: PropTypes.func.isRequired,
  variables: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    message: PropTypes.string,
    location: PropTypes.string,
    imgUrl: PropTypes.string
  }).isRequired
};

CreateKudoButton.defaultProps = {
  onValidate: () => true
};

export default withStyles(styles)(CreateKudoButton);
