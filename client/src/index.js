import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
