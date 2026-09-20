import styles from "../css/sidebar.module.css";

export default function Sidebar({ chars }) {
  const charElements = chars.map((item, index) => (
    <li key={index} className={styles.sidebarListItem}>
      <CharItem name={item.name} imgUrl={item.imgUrl} found={item.found} />
    </li>
  ));

  return (
    <div className={styles.sidebar}>
      <h2>Characters</h2>
      <ul className={styles.sidebarList}>{charElements}</ul>
    </div>
  );
}

function CharItem({ name, imgUrl, found }) {
  return (
    <>
      <img src={imgUrl} alt={`Avatar of ${name}`} width={64} height={119} />
      <p>{name}</p>
      <p>Found: {String(found)}</p>
    </>
  );
}
