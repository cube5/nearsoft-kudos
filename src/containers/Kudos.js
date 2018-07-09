import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { fetchKudos } from "../api";
import Container from "../components/Container";
import Kudo from "../components/Kudo";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    // width: 900,
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
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

  handleMouseHover = (e, kudoId) => {
    this.setState({ hoveringId: kudoId });
  };

  render() {
    const { classes } = this.props;
    const { kudos, hoveringId } = this.state;

    return (
      <Container>
        <div className={classes.root}>
          <Typography variant={"title"}>Existing Kudos</Typography>
          <GridList
            className={classes.gridList}
            cellHeight={300}
            spacing={1}
            cols={3}
          >
            {kudos.map(kudo => (
              <GridListTile
                key={kudo._id}
                cols={1}
                rows={2}
                onMouseEnter={e => this.handleMouseHover(e, kudo._id)}
                onMouseLeave={e => this.handleMouseHover(e, null)}
              >
                <Kudo
                  header={"Nice!"}
                  from={kudo.from}
                  to={kudo.to}
                  message={kudo.message}
                />
                {hoveringId === kudo._id && (
                  <GridListTileBar
                    title={`Created at: ${new Date(kudo.createdAt)}`}
                    titlePosition="top"
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <StarBorderIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    className={null}
                  />
                )}
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Kudos);
