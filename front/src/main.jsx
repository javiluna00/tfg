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
import { RecoilRoot } from "recoil";
import Lenis from '@studio-freight/lenis'
import { GoogleOAuthProvider } from "@react-oauth/google";

// const lenis = new Lenis()
// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId="580307751006-9umaamkk0nmhadd739l92f1gacv4pqmm.apps.googleusercontent.com">
      <BrowserRouter>
        <RecoilRoot>
          <Provider store={store}>
            <App />
          </Provider>
        </RecoilRoot>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </>
);
