import { useEffect, useState } from "react";
import styles from "../css/topbar.module.css";

export default function TopBar() {
  const [time, setTime] = useState<string>("00 : 00");

  useEffect(() => {
    const evtSource = new EventSource("http://localhost:3000/time");
    evtSource.onmessage = (event) => {
      setTime(event.data);
    };

    evtSource.onerror = function (event) {
      console.log(event);
    };
  });

  return (
    <nav className={styles.topbar}>
      <h2>Where's Waldo?</h2>
      <p>{time}</p>
    </nav>
  );
}
