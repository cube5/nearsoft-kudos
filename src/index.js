import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker({
  onContentAvailable: () => {
    // the application should show anotification saying "New content is available; please refresh."
  },
  onContentCached: () => {
    // the application should show anotification saying "Content is cached for offline use."
  }
});
