import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Canvas from "./Canvas.jsx";
import TopBar from "./TopBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopBar />
    <Canvas />
  </StrictMode>,
);
