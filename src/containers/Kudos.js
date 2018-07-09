import React, { Component } from "react";
import dayjs from "dayjs";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core";

import { fetchKudos } from "../api";
import Container from "../components/Container";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  img: {
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class Kudos extends Component {
  state = {
    kudos: [],
    hoveringId: null
  };

  async componentDidMount() {
    const kudos = await fetchKudos();

    this.setState({ kudos });
  }

  render() {
    const { classes } = this.props;
    const { kudos } = this.state;

    return (
      <Container>
        <div className={classes.root}>
          <GridList
            className={classes.gridList}
            cols={3}
            spacing={1}
            cellHeight={"auto"}
          >
            <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
              <ListSubheader component="div">Saved Kudos</ListSubheader>
            </GridListTile>
            {kudos.map(
              kudo =>
                kudo.imgSrc && (
                  <GridListTile key={kudo._id} cols={1} rows={1}>
                    <img src={kudo.imgSrc} className={classes.img} />
                    {
                      <GridListTileBar
                        title={`From: ${kudo.from} To: ${kudo.to}`}
                        subtitle={`Created at: ${dayjs(+kudo.createdAt).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )}`}
                        titlePosition="top"
                        actionIcon={
                          <IconButton className={classes.icon}>
                            <StarBorderIcon />
                          </IconButton>
                        }
                        className={null}
                      />
                    }
                  </GridListTile>
                )
            )}
          </GridList>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Kudos);
