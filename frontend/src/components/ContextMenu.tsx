import { useState } from "react";
import { characters, type Status, type Setter } from "./globals";
import styles from "../css/contextmenu.module.css";

export default function ContextMenu(props: {
  x: number;
  y: number;
  setter: Setter<Status>;
}) {
  console.log(props.x, props.y);
  const [chars, setChars] = useState(characters);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter as HTMLButtonElement;
    const char = buttonClicked.value;
    await makeRequest(char, props.setter);
  }

  async function makeRequest(name: string, setter: Setter<Status>) {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        x: props.x,
        y: props.y,
      }),
    });
    const data = await response.json();
    console.log(data["found"] === "true");
    if (data["found"] === true) {
      setter("found");
      setChars(chars.filter((el) => el.name !== name));
    } else {
      setter("wrong");
    }
  }

  const items = chars.map(
    (item, index) =>
      item.done === false && (
        <li key={index}>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <button value={item.name}>{item.name}</button>
          </form>
        </li>
      ),
  );

  return <ul className={styles.charList}>{items}</ul>;
}
