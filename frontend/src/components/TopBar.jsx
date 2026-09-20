import { useState, useEffect } from "react";
import styles from "../css/topbar.module.css";

export default function TopBar({ gameOver }) {
  return (
    <nav className={styles.topbar}>
      <h2>Where's Waldo?</h2>
      <Timer gameOver={gameOver} />
    </nav>
  );
}

function Timer({ gameOver }) {
  // timer should be in its own component state otherwise whole app/topbar will re-render
  const [time, setTime] = useState("00: 00");

  useEffect(() => {
    if (gameOver === true) return;
    const evtSource = new EventSource("http://localhost:3000/time");
    evtSource.onmessage = (event) => {
      setTime(event.data);
    };
    evtSource.onerror = function (event) {
      console.log(event);
    };

    return () => evtSource.close();
  }, [gameOver]);

  return <p>{time}</p>;
}
