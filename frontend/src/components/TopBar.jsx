import styles from "../css/topbar.module.css";

export default function TopBar() {
  // const topBarTitles = ["Go back"];

  // const topBarItems = topBarTitles.map((item, index) => (
  //   <li key={index}>
  //     <a href="lk">{item}</a>
  //   </li>
  // ));

  return (
    <nav className={styles.topbar}>
      <h2>Where's Waldo?</h2>
    </nav>
  );
}
