import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux-store";
import { Provider } from "react-redux";

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
