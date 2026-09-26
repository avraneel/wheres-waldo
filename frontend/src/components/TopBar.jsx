import { useState, useEffect, useMemo } from "react";
import styles from "../css/topbar.module.css";
import { url } from "./globals";

export default function TopBar({ gameOver, finalTime, setFinalTime }) {
  return (
    <nav className={styles.topbar}>
      <h2>Where's Waldo?</h2>
      <Timer
        gameOver={gameOver}
        finalTime={finalTime}
        setFinalTime={setFinalTime}
      />
    </nav>
  );
}

function Timer({ gameOver, setFinalTime }) {
  const [time, setTime] = useState("00: 00");
  // timer should be in its own component state otherwise whole app/topbar will re-render
  useEffect(() => {
    /**
     * if gameOver is true, the previous useEffect for starting the timer will close that connection,
     * and the new effect will terminate here
     *  */
    if (gameOver === true) {
      setFinalTime(time);
      return () => evtSource.close();
    }
    const evtSource = new EventSource(`${url}/time`);
    evtSource.onmessage = (event) => {
      setTime(event.data);
    };
    evtSource.onerror = function (event) {
      console.log(event);
    };

    return () => evtSource.close();
  }, [gameOver, setFinalTime]);

  return <p>{time}</p>;
}
