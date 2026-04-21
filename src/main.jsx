// Startpunkten för hela appen. Här mountar vi React till HTML-elementet med id="root".
// StrictMode är bara aktivt under utveckling och hjälper oss hitta vanliga misstag.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
