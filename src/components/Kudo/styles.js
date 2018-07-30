import kudoBackgroundImage from "../../assets/kudo_1.jpg";
import { realWorldKudoHeight, realWorldKudoWidth } from "../../constants";

const unstyledInput = {
  background: "transparent",
  border: 0,
  outline: 0,
  textAlign: "center",
  fontFamily: "'Permanent Marker', cursive"
};

export default theme => ({
  root: {
    width: `${realWorldKudoWidth}mm`,
    height: `${realWorldKudoHeight}mm`,
    maxWidth: `${realWorldKudoWidth}mm`,
    maxHeight: `${realWorldKudoHeight}mm`,
    background: `url(${kudoBackgroundImage}) 0px -22px repeat-y`,
    backgroundSize: "cover"
  },
  paperContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 300,
    overflow: "hidden"
  },
  messageContainer: {
    position: "absolute",
    top: 212,
    right: 11,
    bottom: 30,
    left: 11,
    textAlign: "center"
  },
  from: {
    ...unstyledInput,
    fontSize: 16,
    width: "100%"
  },
  to: {
    ...unstyledInput,
    fontSize: 16,
    width: "100%"
  },
  message: {
    width: "100%",
    maxWidth: "100%",
    height: 130,
    maxHeight: "100%",
    // padding: "2px 10px",
    border: 0,
    outline: 0,
    background: "transparent",
    // fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    lineHeight: "16px",
    boxSizing: "border-box",
    textAlign: "center",
    // zIndex: 1,
    resize: "none",
    fontFamily: "'Permanent Marker', cursive"
  }
});
