import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./slices/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./server";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div"), // for testing
);
