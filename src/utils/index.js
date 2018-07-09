import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

// A function you can extract and put into its own module.
// Yes, 11 lines of code is all you need.
export function createStyled(styles, options) {
  function Styled(props) {
    const { children, ...other } = props;
    return props.children(other);
  }
  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };
  return withStyles(styles, options)(Styled);
}
