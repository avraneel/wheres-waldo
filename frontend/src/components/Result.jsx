import { useRef, useEffect } from "react";
import styles from "../css/result.module.css";

export default function Result({ status, setStatus }) {
  const dialogRef = useRef(null);
  let text = "";

  if (status === "found") {
    text = "Correct Choice!";
  } else if (status === "wrong") {
    text = "Wrong Choice!";
  }

  function handleClick() {
    const dialog = dialogRef.current;
    dialog.close();
    setStatus("unfound");
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (status === "found" || status === "wrong") {
      dialog.showModal();
    }
  }, [status]);

  return (
    <dialog className={styles.result} ref={dialogRef}>
      {text}
      <button onClick={handleClick}>Close</button>
    </dialog>
  );
}
