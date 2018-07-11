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

/**
 * Returns millimeters converted to pixels.
 * 1 mm = 3.7795275591 px
 * @see https://www.unitconverters.net/typography/millimeter-to-pixel-x.htm
 * @param {number} millimeters
 */
export function millimetersToPixels(millimeters = 0) {
  return millimeters * 3.7795275591;
}
