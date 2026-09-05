import styles from "./topbar.module.css";

export default function TopBar() {
  const topBarTitles = ["Go back"];

  const topBarItems = topBarTitles.map((item, index) => (
    <li key={index}>
      <a href="lk">{item}</a>
    </li>
  ));

  return (
    <nav className={styles.topbar}>
      <ul>{topBarItems}</ul>
    </nav>
  );
}
