import green from "@material-ui/core/colors/green";
export default theme => ({
  buttonContainer: {
    position: "relative",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      marginTop: 45
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 10
    }
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit,
    marginDown: theme.spacing.unit,
    [theme.breakpoints.up("xs")]: {
      width: "50%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    color: "#fff",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  shareableLink: {
    textAlign: "center",
    width: "80%",
    margin: "0 auto"
  }
});
