import { useEffect, useRef, useState } from "react";
import imgUrl from "../assets/museum.png";
import styles from "../css/canvas.module.css";
import { characters } from "../globals";

export default function Canvas() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [box, setBox] = useState({
    x: -1,
    y: -1,
    locx: 0,
    locy: 0,
    show: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    img.addEventListener("load", () => {
      canvas.width = img.width;
      canvas.height = img.height;

      for (let i = 0; i < canvas.width; i += 100) {
        for (let j = 0; j < canvas.height; j += 100) {
          ctx.strokeRect(i, j, 100, 100);
        }
      }
    });

    img.src = imgUrl;
  }, []);

  function handleClick(e) {
    const canvas = e.currentTarget;
    const container = canvas.parentElement;

    const canvasRect = canvas.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    /**
     * offsetY = offset from canvas, and top in css means top from container
     * so we need to take into account the space between canvas and container
     * so, offsetY + (canvas.top - container.top) gives that space
     */

    const locx = canvasRect.left - containerRect.left + e.nativeEvent.offsetX;
    const locy = canvasRect.top - containerRect.top + e.nativeEvent.offsetY;

    console.log(e.nativeEvent.offsetY);
    setBox({
      x: ~~(e.nativeEvent.offsetX / 100),
      y: ~~(e.nativeEvent.offsetY / 100),
      locx,
      locy,
      show: true,
    });
  }

  return (
    <div className={styles.canvasContainer}>
      <img ref={imgRef} src={imgUrl} alt="museum" className={styles.mapImage} />
      <canvas
        ref={canvasRef}
        className={styles.mapCanvas}
        onClick={handleClick}
      ></canvas>
      {box.show && (
        <div
          className={styles.popoverNames}
          style={{
            top: box.locy,
            left: box.locx,
          }}
        >
          <ContextMenu x={box.x} y={box.y} />
        </div>
      )}
      ;
    </div>
  );
}

function ContextMenu({ x, y }) {
  console.log(x, y);
  const [chars, setChars] = useState(characters);

  function handleSubmit(e) {
    e.preventDefault();
    const char = e.nativeEvent.submitter.value;
    setChars(chars.filter((el) => el.name !== char));
    // send request here
  }

  const items = chars.map(
    (item, index) =>
      item.done === false && (
        <li key={index}>
          <form method="post" onSubmit={handleSubmit}>
            <button value={item.name}>{item.name}</button>
          </form>
        </li>
      ),
  );

  return <ul className={styles.charList}>{items}</ul>;
}
