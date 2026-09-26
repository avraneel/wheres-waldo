import { useEffect, useRef, useState } from "react";
import imgUrl from "../assets/museum.avif";
import markerUrl from "../assets/marker.svg";
import styles from "../css/canvas.module.css";
import contextMenuStyles from "../css/contextmenu.module.css";
import Result from "./Result";

import { url } from "./globals";

const widthFactor = 100 / 1075;
const heightFactor = 100 / 668;

export default function Canvas({
  status,
  setStatus,
  chars,
  setChars,
  gameOver,
  setGameOver,
}) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  // console.log("render");
  const [box, setBox] = useState({
    x: -1,
    y: -1,
    locx: 0,
    locy: 0,
    clickedX: 0,
    clickedY: 0,
    show: false,
  });

  useEffect(() => {
    /**
     * this useEffect will occur only when chars is updated, so we update chars
     * only when it is found and re-render
     */
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    function drawCanvas() {
      canvas.width = img.width;
      canvas.height = img.height;

      for (let i = 0; i < canvas.width; i += img.width * widthFactor) {
        for (let j = 0; j < canvas.height; j += img.height * heightFactor) {
          ctx.strokeRect(
            i,
            j,
            img.width * widthFactor,
            img.height * heightFactor,
          );
        }
      }
    }

    img.addEventListener("load", () => {
      drawCanvas();
    });

    window.addEventListener("resize", () => {
      drawCanvas();
    });

    function drawMarker(x, y) {
      const marker = new Image();
      marker.addEventListener("load", () => {
        ctx.drawImage(marker, x - 24, y - 48);
      });
      marker.src = markerUrl;
    }

    chars.forEach((el) => {
      if (el.found === true) {
        drawMarker(el.clickedX, el.clickedY);
      }
    });
  }, [chars]);

  function handleClick(e) {
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

    setBox({
      x: ~~(e.nativeEvent.offsetX / (canvas.width * widthFactor)),
      y: ~~(e.nativeEvent.offsetY / (canvas.height * heightFactor)),
      locx,
      locy,
      show: true,
      clickedX: e.nativeEvent.offsetX,
      clickedY: e.nativeEvent.offsetY,
    });
  }

  return (
    <main className={styles.canvasContainer}>
      <img
        ref={imgRef}
        src={imgUrl}
        alt="museum"
        width={1075}
        height={668}
        fetchPriority="high"
        className={styles.mapImage}
      />
      <canvas
        ref={canvasRef}
        width={1075}
        height={668}
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
          <ContextMenu
            box={box}
            setBox={setBox}
            chars={chars}
            setChars={setChars}
            status={status}
            setStatus={setStatus}
            setGameOver={setGameOver}
          />
        </div>
      )}
      <Result status={status} setStatus={setStatus} gameOver={gameOver} />
    </main>
  );
}

function ContextMenu({ box, setBox, chars, setChars, setStatus, setGameOver }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter;
    const char = buttonClicked.value;
    await makeRequest(char);
  }

  async function makeRequest(name) {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        x: box.x,
        y: box.y,
      }),
    });
    const data = await response.json();
    if (data["found"] === true) {
      // multiple state changes will be batched together
      setStatus("found");
      if (chars.filter((el) => el.found === true).length + 1 === chars.length) {
        console.log("game over");
        setGameOver(true);
      }
      setChars(
        chars.map((el) =>
          el.name === name
            ? {
                ...el,
                clickedX: box.clickedX,
                clickedY: box.clickedY,
                found: true,
              }
            : { ...el },
        ),
      );
    } else {
      setStatus("wrong");
    }
    setBox({ ...box, show: false });
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

  return <ul className={contextMenuStyles.charList}>{items}</ul>;
}
