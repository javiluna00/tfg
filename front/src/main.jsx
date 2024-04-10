import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "../src/assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import providerStore from "./store";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import Lenis from '@studio-freight/lenis'
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "react-auth-kit/AuthProvider";
// import { store } from "./store/authenticationStore";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// const lenis = new Lenis()
// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <Elements stripe={stripePromise}>
      <GoogleOAuthProvider clientId="580307751006-9umaamkk0nmhadd739l92f1gacv4pqmm.apps.googleusercontent.com">
        <BrowserRouter>
          <RecoilRoot>
            <Provider store={providerStore}>
              <App />
            </Provider>
          </RecoilRoot>
        </BrowserRouter>
      </GoogleOAuthProvider>
      </Elements>
  </>
);
