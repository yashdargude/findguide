import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
import "@fortawesome/fontawesome-free/css/all.min.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        richColors
        position="top-right"
        visibleToasts={3}
        duration={2000}
        closeButton
        expand={true}
      />
    </BrowserRouter>
  </React.StrictMode>
);
