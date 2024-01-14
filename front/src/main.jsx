import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "../src/assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import "./server";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
    </BrowserRouter>
  </>
);
