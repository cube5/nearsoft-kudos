import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import jsPDF from "jspdf";

import styles from "./styles";
import Container from "../../components/Container";
import EmbededPdf from "../../components/EmbededPdf";
import { realWorldKudoHeight, realWorldKudoWidth } from "../../constants";
import KUDOS from "../../graphql/queries/KUDOS";

class Kudos extends Component {
  currentX = 0; // x coordinate to put the next kudo in the pdf.
  currentY = 0; // y coordinate to put the next kudo in the pdf.
  maxKudosPerRow = 4;
  maxKudosPerPage = 8;
  pdfDoc = new jsPDF("landscape");

  currentKudosInRow = 0; // quantity of kudos in the current row.
  currentKudosInPage = 0; // quantity of kudos in the current page.

  state = {
    pdfUri: this.pdfDoc.output("bloburi"),
    kudosToPrint: [] // ids only.
  };

  handleAddToPrintClick = (e, kudo) => {
    this.setState(state => {
      const { kudosToPrint } = state;

      if (kudosToPrint.includes(kudo.id)) {
        state.kudosToPrint = [];
        this.currentKudosInRow = 0;
        this.currentKudosInPage = 0;
        this.pdfDoc = new jsPDF("landscape");
        return state;
      } else {
        kudosToPrint.push(kudo.id);

        const isCurrentRowFull = this.currentKudosInRow >= this.maxKudosPerRow;
        const isCurrentPageFull =
          this.currentKudosInPage >= this.maxKudosPerPage;

        if (isCurrentRowFull) {
          this.currentKudosInRow = 0;
        }

        if (isCurrentPageFull) {
          this.pdfDoc.addPage();
          this.currentKudosInRow = 0;
          this.currentKudosInPage = 0;
        }

        const isFirstRow = this.currentKudosInPage < this.maxKudosPerRow;

        this.currentX = realWorldKudoWidth * this.currentKudosInRow;
        this.currentY = isFirstRow ? 0 : realWorldKudoHeight;

        this.pdfDoc.addImage(
          kudo.imgUrl,
          "PNG",
          this.currentX,
          this.currentY,
          realWorldKudoWidth,
          realWorldKudoHeight
        );

        state.pdfUri = this.pdfDoc.output("bloburi");

        this.currentKudosInRow++;
        this.currentKudosInPage++;

        return state;
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { kudosToPrint, pdfUri } = this.state;

    return (
      <div className={classes.root}>
        <Container>
          <Query query={KUDOS}>
            {({ loading, error, data }) => {
              if (loading) return <CircularProgress />;

              if (error) {
                return (
                  <Typography>
                    Sorry an error just happend, please try again
                    <span role="img" aria-label="sad face">
                      😢
                    </span>
                    .
                  </Typography>
                );
              }

              return (
                <Grid
                  container
                  spacing={24}
                  justify="space-around"
                  className={classes.grid}
                >
                  <Grid item md={6} sm={12}>
                    <Fragment>
                      <Typography variant="h2" gutterBottom>
                        Kudos
                      </Typography>
                      <Grid
                        container
                        spacing={8}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          minWidth: 300,
                          width: "100%"
                        }}
                      >
                        {data.kudoes.length === 0 && (
                          <Typography variant="subtitle1" gutterBottom>
                            No kudos found :/
                          </Typography>
                        )}

                        {data.kudoes.map(
                          kudo =>
                            kudo.imgUrl && (
                              <Grid key={kudo.id} item sm={4} xs={6}>
                                <ButtonBase
                                  className={classes.imageButton}
                                  onClick={e =>
                                    this.handleAddToPrintClick(e, kudo)
                                  }
                                >
                                  <img
                                    src={kudo.imgUrl}
                                    alt="kudo"
                                    width="100%"
                                    className={classes.image}
                                  />
                                  <span className={classes.imageBackdrop} />

                                  <div className={classes.meta}>
                                    {kudosToPrint.includes(kudo.id) ? (
                                      <div className={classes.iconClicked}>
                                        {kudosToPrint.findIndex(
                                          id => kudo.id === id
                                        ) + 1}
                                      </div>
                                    ) : (
                                      <AddIcon className={classes.icon} />
                                    )}
                                    <Typography
                                      style={{
                                        color: "rgba(255, 255, 255, 0.8)"
                                      }}
                                      gutterBottom
                                    >
                                      {kudo.from} to {kudo.to}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      style={{
                                        color: "rgba(255, 255, 255, 0.8)"
                                      }}
                                    >
                                      {dayjs(kudo.createdAt).format(
                                        "MMMM DD, YYYY"
                                      )}
                                    </Typography>
                                  </div>
                                </ButtonBase>
                              </Grid>
                            )
                        )}
                      </Grid>
                    </Fragment>
                  </Grid>
                  <Grid item md={6} sm={6}>
                    <Fragment>
                      <Typography variant="h2" gutterBottom>
                        Print Preview
                      </Typography>
                      <EmbededPdf src={pdfUri} />
                    </Fragment>
                  </Grid>
                </Grid>
              );
            }}
          </Query>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Kudos);
