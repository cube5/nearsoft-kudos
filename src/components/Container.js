import React from "react";
import { css } from "emotion";

const styles = {
  container: css`
    padding: 20px 30px;
  `
};

export default ({ className, children }) => (
  <div className={`${styles.container} ${className || ""}`}>{children}</div>
);
