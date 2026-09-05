import waldoUrl from "./assets/waldo.png";
import wendaUrl from "./assets/wenda.png";
import odlawUrl from "./assets/odlaw.png";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const characters = [
    {
      name: "Waldo",
      imgUrl: waldoUrl,
    },
    {
      name: "Wenda",
      imgUrl: wendaUrl,
    },
    {
      name: "Odlaw",
      imgUrl: odlawUrl,
    },
  ];

  const charElements = characters.map((item, index) => (
    <li key={index}>
      <CharItem name={item.name} imgUrl={item.imgUrl} />
    </li>
  ));

  return (
    <div>
      <h2>Characters</h2>
      <ul>{charElements}</ul>
    </div>
  );
}

function CharItem({ name, imgUrl }) {
  return (
    <div className="sidebar">
      <img src={imgUrl} alt={name} width={64} />
      <p>{name}</p>
    </div>
  );
}
