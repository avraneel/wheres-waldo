import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Result from "./Result";
import styles from "../css/app.module.css";
import { useState } from "react";

export default function App() {
  console.log("render App");
  const [status, setStatus] = useState("unfound");
  return (
    <div className={styles.app}>
      <TopBar />
      <Sidebar />
      <Canvas status={status} setStatus={setStatus} />
      <Result />
    </div>
  );
}
