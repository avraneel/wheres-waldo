import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Result from "./Result";
import { type Status } from "./globals";
import styles from "../css/app.module.css";

export default function App() {
  const [status, setStatus] = useState<Status>("unfound");
  const [time, setTime] = useState<string>("00: 00");

  useEffect(() => {
    const evtSource = new EventSource("http://localhost:3000/time");
    evtSource.onmessage = (event) => {
      setTime(event.data);
    };

    evtSource.onerror = function (event) {
      console.log(event);
    };
  }, []);

  return (
    <div className={styles.app}>
      <TopBar time={time} />
      <Sidebar />
      <Canvas setter={setStatus} />
      <Result status={status} setter={setStatus} />
    </div>
  );
}
