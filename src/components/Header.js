import React, { Component } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
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

const styles = {
  root: css`
    flex-grow: 1;
  `,
  flex: css`
    flex: 1;
  `,
  drawerContent: css`
    width: 250px;
  `,
  menuButton: css`
    margin-left: -12px;
    margin-right: 20px;
  `
};

const VERSION = require("../../package.json").version;

class Header extends Component {
  state = {
    open: false
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Drawer open={open} onClose={this.close}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.close}
                onKeyDown={this.close}
                className={styles.drawerContent}
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
            </Drawer>

            <IconButton
              color="inherit"
              aria-label="Menu"
              className={styles.menuButton}
              onClick={this.open}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit" className={styles.flex}>
              Nearsoft Kudos
            </Typography>

            <Typography variant="caption" color="inherit">
              v{VERSION}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
