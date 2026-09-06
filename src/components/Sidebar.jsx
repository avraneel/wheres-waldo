import { characters } from "../globals";
import styles from "../css/sidebar.module.css";

export default function Sidebar() {
  const charElements = characters.map((item, index) => (
    <li key={index} className={styles.sidebarListItem}>
      <CharItem name={item.name} imgUrl={item.imgUrl} />
    </li>
  ));

  return (
    <div>
      <h2>Characters</h2>
      <ul className={styles.sidebarList}>{charElements}</ul>
    </div>
  );
}

function CharItem({ name, imgUrl }) {
  return (
    <div className={styles.sidebar}>
      <img src={imgUrl} alt={name} width={64} />
      <p>{name}</p>
    </div>
  );
}
