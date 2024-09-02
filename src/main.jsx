import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SimonSaysGame } from "./simonSaysGame.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SimonSaysGame />
  </StrictMode>
);
