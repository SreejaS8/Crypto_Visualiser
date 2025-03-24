import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css"; // Updated to use global styles
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
