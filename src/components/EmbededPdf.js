import React from "react";

export default ({ src, className }) => (
  <iframe
    src={src}
    title="pdf preview"
    className={className || ""}
    type="application/pdf"
    width="100%"
    height="100%"
    frameBorder="0"
    style={{
      position: "relative"
    }}
  />
);
