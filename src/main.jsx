import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
const toastElList = document.querySelectorAll(".toast");
const toastList = [...toastElList].map(
  (toastEl) =>
    new window.bootstrap.Toast(toastEl, { autohide: true, delay: 3000 })
);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
