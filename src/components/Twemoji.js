import React from "react";
import twemoji from "twemoji";

export default ({ emoji, width = 24 }) => (
  <span
    style={{ width }}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, { folder: "svg", ext: ".svg" })
    }}
  />
);
