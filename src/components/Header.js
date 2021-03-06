import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";
import Feedback from "./Feedback/index";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerContent: {
    width: 250
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const VERSION = require("../../package.json").version;

class Header extends Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <SwipeableDrawer
              variant="temporary"
              ModalProps={{ keepMounted: true }}
              open={open}
              onOpen={this.handleOpen}
              onClose={this.handleClose}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.close}
                onKeyDown={this.close}
                className={classes.drawerContent}
              >
                <List component="nav">
                  <ListItem button component={Link} to="/">
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItem>

                  <ListItem button component={Link} to="/kudos">
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Kudos" />
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>

            <IconButton
              color="inherit"
              aria-label="Menu"
              className={classes.menuButton}
              onClick={this.handleOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.flex}>
              Nearsoft Kudos
            </Typography>

            <Feedback />

            <Typography variant="caption" color="inherit">
              v{VERSION}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
