import { useEffect, useRef, useState } from "react";
import imgUrl from "../assets/museum.avif";
import styles from "../css/canvas.module.css";
import ContextMenu from "./ContextMenu";

const widthFactor = 100 / 1075;
const heightFactor = 100 / 668;

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
  }, []);

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
          <ContextMenu x={box.x} y={box.y} />
        </div>
      )}
    </main>
  );
}
