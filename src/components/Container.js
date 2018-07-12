import React from "react";
import { css } from "emotion";

const styles = {
  container: css`
    flow-grow: 1;
    padding: 20px 30px;
  `
};

export default ({ children }) => (
  <div className={styles.container}>{children}</div>
);
