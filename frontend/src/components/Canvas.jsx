import { useEffect, useRef, useState } from "react";
import imgUrl from "../assets/museum.png";
import { boundingBoxLength } from "../globals";
import styles from "../css/canvas.module.css";
import { characters } from "../globals";

export default function Canvas() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    img.addEventListener("load", () => {
      canvas.width = img.width;
      canvas.height = img.height;

      for (let i = 0; i < canvas.width; i += 100) {
        for (let j = 0; j < canvas.height; j += 100) {
          // TODO store this value somewhere
          ctx.strokeRect(i, j, 100, 100);
        }
      }
    });

    canvas.addEventListener("click", (e) => {
      const x = ~~(e.offsetX / 100);
      const y = ~~(e.offsetY / 100);
      console.log(x, y);
      const popover = popoverRef.current;
      popover.hidePopover();
      popover.style.left = `${e.offsetX + boundingBoxLength / 2}px`;
      popover.style.top = `${e.offsetY}px`;
      popover.showPopover();
    });

    img.src = imgUrl;
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <img ref={imgRef} src={imgUrl} alt="museum" className={styles.mapImage} />
      <canvas ref={canvasRef} className={styles.mapCanvas}></canvas>
      <div ref={popoverRef} className={styles.popoverNames} popover="auto">
        <ContextMenu />
      </div>{" "}
    </div>
  );
}

function ContextMenu() {
  const characterRef = useRef(null);
  const [chars, setChars] = useState(characters);

  function handleSubmit(e) {
    e.preventDefault();
    const char = e.nativeEvent.submitter.value;
    setChars(chars.filter((el) => el.name !== char));
    // send request here
  }

  const items = chars.map((item, index) => (
    <li key={index}>
      <form method="post" onSubmit={handleSubmit}>
        <button ref={characterRef} value={item.name}>
          {item.name}
        </button>
      </form>
    </li>
  ));

  return <ul>{items}</ul>;
}
