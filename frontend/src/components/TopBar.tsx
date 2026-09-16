import styles from "../css/topbar.module.css";

export default function TopBar({ time }: { time: string }) {
  return (
    <nav className={styles.topbar}>
      <h2>Where's Waldo?</h2>
      <p>{time}</p>
    </nav>
  );
}
