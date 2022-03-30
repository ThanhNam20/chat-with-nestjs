import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "react-toastify/dist/ReactToastify.css";
import { myHistory } from "./services/history.sercive";
import { ToastContainer } from "react-toastify";
import { HistoryRouter } from "./services/history-router.service";
import { RecoilRoot } from "recoil";
ReactDOM.render(
  <HistoryRouter history={myHistory}>
    <RecoilRoot>
      <App />
      <ToastContainer />
    </RecoilRoot>
  </HistoryRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
