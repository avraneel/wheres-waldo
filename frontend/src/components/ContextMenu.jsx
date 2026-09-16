import { useState } from "react";
import { characters } from "./globals";
import markerIcon from "../assets/marker.svg";
import styles from "../css/contextmenu.module.css";

export default function ContextMenu({ x, y, canvasRef, pointx, pointy }) {
  const [chars, setChars] = useState(characters);

  async function handleSubmit(e) {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter;
    const char = buttonClicked.value;
    await makeRequest(char);
  }

  async function makeRequest(name) {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        x,
        y,
      }),
    });
    const data = await response.json();
    if (data["found"] === true) {
      setChars(
        chars.map((el) =>
          el.name === name ? { ...el, found: true } : { ...el, found: false },
        ),
      );
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const marker = new Image();
      console.log(pointx);
      console.log(ctx);
      marker.addEventListener("load", () => {});

      marker.src = markerIcon;
      ctx.drawImage(marker, pointx, pointy);
    }
  }

  const items = chars.map(
    (item, index) =>
      item.found === false && (
        <li key={index}>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <button value={item.name}>{item.name}</button>
          </form>
        </li>
      ),
  );

  return <ul className={styles.charList}>{items}</ul>;
}
