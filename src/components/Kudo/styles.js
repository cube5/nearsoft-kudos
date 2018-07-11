import kudoBackgroundImage from "../../assets/kudo_1.jpg";
import { realWorldKudoHeight, realWorldKudoWidth } from "../../constants";

export default theme => ({
  root: {
    // margin: "0 auto",
    width: `${realWorldKudoWidth}mm`,
    height: `${realWorldKudoHeight}mm`,
    maxWidth: `${realWorldKudoWidth}mm`,
    maxHeight: `${realWorldKudoHeight}mm`,
    background: `url(${kudoBackgroundImage}) no-repeat`,
    backgroundSize: "cover"
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: 40
  },
  paperContainer1: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 300,
    maxHeight: 300,
    margin: "0 auto",
    // marginBottom: 10,
    overflow: "hidden"
  },
  messageContainer1: {
    position: "absolute",
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
    // background: "linear-gradient(transparent, transparent 28px, #91d1d3 28px)",
    // backgroundSize: "30px 30px"
  },
  paperContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 300,
    // maxHeight: 300,
    overflow: "hidden"
  },
  messageContainer: {
    position: "absolute",
    top: 240,
    right: 11,
    bottom: 30,
    left: 11
    // background: "linear-gradient(transparent, transparent 28px, #91d1d3 28px)",
    // backgroundSize: "30px 30px"
  },
  message: {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "100%",
    lineHeight: "16px",
    // padding: "2px 10px",
    border: 0,
    outline: 0,
    background: "transparent",
    // fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 18,
    boxSizing: "border-box",
    zIndex: 1,
    resize: "none"
  },
  meta: {
    padding: 20
  },
  metaLabel: {
    opacity: 0.5,
    width: 30
  }
});
