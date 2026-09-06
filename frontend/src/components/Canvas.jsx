import { useEffect, useRef } from "react";
import imgUrl from "../assets/museum.png";
import { boundingBoxLength } from "../globals";
import styles from "../css/canvas.module.css";
import { characters } from "../globals";

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
      console.log(e.x, e.y);
      ctx.stroke();
      // set popover
      const popover = popoverRef.current;
      popover.hidePopover();
      popover.style.left = `${e.clientX + boundingBoxLength / 2}px`;
      popover.style.top = `${e.clientY}px`;
      console.log(popover.style.left);
      console.log(popover.style.top);
      popover.showPopover();
    });

    img.src = imgUrl;
  }, []);

  return (
    <>
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.mapCanvas}></canvas>
        <img
          src={imgUrl}
          alt="museum"
          className={styles.mapImage}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div ref={popoverRef} className={styles.popoverNames} popover="auto">
          <ContextMenu />
        </div>
      </div>
    </>
  );
}

function ContextMenu() {
  const items = characters.map((item, index) => (
    <li key={index}>{item.name}</li>
  ));

  return <ul>{items}</ul>;
}
