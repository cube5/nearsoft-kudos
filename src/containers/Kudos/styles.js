import green from "@material-ui/core/colors/green";

export default theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    // minHeight: 450
  },
  imageButton: {
    position: "relative",
    width: "100%",
    "&:hover": {
      "& $imageBackdrop": {
        opacity: 0.2
      },
      "& $icon": {
        color: "rgba(255, 255, 255, 0.9)"
      }
    }
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.8,
    transition: theme.transitions.create("opacity")
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  meta: {
    zIndex: 1,
    position: "absolute"
  },
  icon: {
    fontSize: 36,
    color: "rgba(255, 255, 255, 0.8)"
  },
  iconClicked: {
    fontSize: 48,
    color: green["500"]
  }
});
