import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class SearchBox extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    return (
      <TextField
        id="search-kudos"
        variant="outlined"
        placeholder="Search kudos"
        value={this.props.value}
        onChange={this.props.onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        fullWidth
      />
    );
  }
}

export default withStyles(styles)(SearchBox);
