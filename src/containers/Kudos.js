import React, { Component } from "react";
import dayjs from "dayjs";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { withStyles, Typography } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

import { fetchKudos } from "../api";
import Container from "../components/Container";

const styles = theme => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper
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
    kudosToPrint: [] // ids only
  };

  async componentDidMount() {
    const kudos = await fetchKudos();

    this.setState({ kudos });
  }

  handleAddClick = (e, id) => {
    this.setState(state => {
      const { kudosToPrint } = state;
      if (kudosToPrint.includes(id)) {
        state.kudosToPrint = kudosToPrint.filter(_id => _id !== id);
      } else {
        kudosToPrint.push(id);
      }
      return state;
    });
  };

  render() {
    const { classes } = this.props;
    const { kudos, kudosToPrint } = this.state;

    return (
      <Container>
        <div className={classes.root}>
          <Typography variant="display2" gutterBottom>
            Created Kudos
          </Typography>
          <Container>
            <GridList
              cols={4}
              spacing={4}
              cellHeight={300}
              className={classes.gridList}
            >
              {kudos.length === 0 ? (
                <Typography variant="display1" gutterBottom>
                  Kudos found: {kudos.length}
                </Typography>
              ) : (
                kudos.map(
                  kudo =>
                    kudo.imgSrc && (
                      <GridListTile key={kudo._id} cols={1} rows={1}>
                        <img src={kudo.imgSrc} className={classes.img} />
                        <GridListTileBar
                          title={`${kudo.from} to ${kudo.to}`}
                          subtitle={dayjs(+kudo.createdAt).format(
                            "MMMM DD, YYYY"
                          )}
                          titlePosition="top"
                          actionIcon={
                            <IconButton
                              className={classes.icon}
                              onClick={e => this.handleAddClick(e, kudo._id)}
                            >
                              {kudosToPrint.includes(kudo._id) ? (
                                <div style={{ color: green["500"] }}>
                                  {kudosToPrint.findIndex(
                                    id => kudo._id === id
                                  ) + 1}
                                </div>
                              ) : (
                                <AddCircleOutlineIcon />
                              )}
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    )
                )
              )}
            </GridList>
          </Container>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Kudos);
