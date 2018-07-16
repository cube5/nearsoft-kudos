import green from "@material-ui/core/colors/green";
import { realWorldKudoHeight, realWorldKudoWidth } from "../../constants";

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
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  previewContainer: {
    width: `${realWorldKudoWidth}mm`,
    height: `${realWorldKudoHeight}mm`,
    maxWidth: `${realWorldKudoWidth}mm`,
    maxHeight: `${realWorldKudoHeight}mm`
  }
});
