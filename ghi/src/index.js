import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const POSTHOG_API_KEY = process.env.REACT_APP_POSTHOG_API_KEY;

posthog.init(POSTHOG_API_KEY, {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PostHogProvider client={posthog}>
    <Provider store={store}>
      <App />
    </Provider>
  </PostHogProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
