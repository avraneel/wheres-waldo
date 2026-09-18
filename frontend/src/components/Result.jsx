import styles from "../css/result.module.css";

export default function Result({ status, setStatus }) {
  function handleClick() {
    setStatus("unfound");
  }

  return (
    (status === "found" || status === "wrong") && (
      <dialog className={styles.result} open>
        {status === "found" ? "Correct choice!" : "Wrong Choice!"}
        <button onClick={handleClick}>Close</button>
      </dialog>
    )
  );
}
