import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Canvas from "./components/Canvas";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopBar />
    <Sidebar />
    <Canvas />
  </StrictMode>,
);
