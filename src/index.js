import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { SW_CONTENT_CACHED, SW_CONTENT_AVAILABLE } from "./constants";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker({
  onContentAvailable: () => {
    // the application should show anotification saying "New content is available; please refresh."
    document.dispatchEvent(new Event(SW_CONTENT_CACHED));
  },
  onContentCached: () => {
    // the application should show anotification saying "Content is cached for offline use."
    document.dispatchEvent(new Event(SW_CONTENT_AVAILABLE));
  }
});
