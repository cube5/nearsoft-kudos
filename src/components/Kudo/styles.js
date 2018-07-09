import { css } from "emotion";

export default {
  root: css`
    margin: 0 auto;
    // min-width: 400px;
    max-width: 500px;
  `,
  header: css`
    background-color: #3f51b5;
    border-radius: 4px 4px 0px 0px;
    padding: 40px;
  `,
  paperContainer: css`
    position: relative;
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    margin: 0 auto;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
  `,
  paperContent: css`
    position: absolute;
    top: 30px;
    right: 30px;
    bottom: 30px;
    left: 30px;
    background: linear-gradient(transparent, transparent 28px, #91d1d3 28px);
    background-size: 30px 30px;
  `,
  message: css`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    line-height: 30px;
    padding: 2px 10px;
    border: 0;
    outline: 0;
    background: transparent;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 18px;
    box-sizing: border-box;
    z-index: 1;
    resize: none;
  `,
  meta: css`
    padding: 20px;
  `,
  metaLabel: css`
    opacity: 0.5;
    width: 30px;
  `
};
