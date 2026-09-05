import { characters } from "./globals";

export default function Sidebar() {
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
