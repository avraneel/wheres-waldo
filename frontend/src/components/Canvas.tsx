import { useEffect, useRef, useState } from "react";
import imgUrl from "../assets/museum.png";
import styles from "../css/canvas.module.css";
import { characters } from "../globals";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState({
    x: -1,
    y: -1,
    locx: 0,
    locy: 0,
    show: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    const img = imgRef.current;
    if (img === null) return;
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

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = e.currentTarget;
    const container = canvas.parentElement;
    if (container == null) return;

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
        onClick={(e) => handleClick(e)}
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

function ContextMenu(props: { x: number; y: number }) {
  console.log(props.x, props.y);
  const [chars, setChars] = useState(characters);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter as HTMLButtonElement;
    const char = buttonClicked.value;
    setChars(chars.filter((el) => el.name !== char));
    // send request here
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: char,
        x: props.x,
        y: props.y,
      }),
    });
  }

  async function makeRequest(params: type) {}

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
