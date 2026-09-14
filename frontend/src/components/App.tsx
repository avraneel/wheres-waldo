import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Result from "./Result";
import { type Status } from "./globals";
import styles from "../css/app.module.css";

export default function App() {
  const [status, setStatus] = useState<Status>("unfound");
  return (
    <div className={styles.app}>
      <TopBar />
      <Sidebar />
      <Canvas setter={setStatus} />
      <Result status={status} setter={setStatus} />
    </div>
  );
}
