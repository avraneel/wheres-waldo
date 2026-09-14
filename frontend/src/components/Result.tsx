import { type Status, type Setter } from "./globals";
import styles from "../css/result.module.css";

export default function Result({
  status,
  setter,
}: {
  status: Status;
  setter: Setter<Status>;
}) {
  function handleClick() {
    setter("unfound");
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
