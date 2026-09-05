import { useEffect, useRef } from "react";
import imgUrl from "./assets/museum.png";
import { boundingBoxLength } from "./globals";
import styles from "./canvas.module.css";

export default function Canvas() {
  const canvasRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.addEventListener("load", () => {
      // it resizes on window resize. need to stop this bug
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    });

    canvas.addEventListener("click", (e) => {
      let rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.rect(
        e.x - rect.left - boundingBoxLength / 2,
        e.y - rect.top - boundingBoxLength / 2,
        boundingBoxLength,
        boundingBoxLength,
      );
      ctx.stroke();
      // set popover
      const popover = popoverRef.current;
      popover.showPopover();
    });

    img.src = imgUrl;
    let rect = canvas.getBoundingClientRect();
    console.log(rect.left + "," + rect.top);
  }, []);

  return (
    <>
      <div className="canvasContainer">
        <canvas ref={canvasRef} className={styles.mapCanvas}></canvas>
        <img
          src={imgUrl}
          alt="museum"
          className={styles.mapImage}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div ref={popoverRef} className="popoverNames" popover="auto">
          Popover
        </div>
      </div>
    </>
  );
}

function contextMenu() {
  return <ul></ul>;
}
