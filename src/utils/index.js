import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

/**
 * @see https://material-ui.com/customization/css-in-js/#render-props-api-11-lines-
 * @param {object} styles
 * @param {object} options
 */
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
