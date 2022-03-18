import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "react-toastify/dist/ReactToastify.css";
import { HistoryRouter } from "./components/history-router.component";
import { myHistory } from "./services/history.sercive";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <HistoryRouter history={myHistory}>
    <App />
    <ToastContainer />
  </HistoryRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
