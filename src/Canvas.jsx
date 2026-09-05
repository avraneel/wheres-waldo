import { useEffect, useRef } from "react";
import imgUrl from "./assets/museum.png";
import { boundingBoxLength } from "./globals";

export default function Canvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.addEventListener("load", () => {
      // it resizes on window resize. need to stop this bug
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    });

    canvas.addEventListener("click", (e) => {
      let rect = canvas.getBoundingClientRect();
      console.log(e.x + "," + e.y);
      ctx.beginPath();
      ctx.rect(
        e.x - rect.left - boundingBoxLength / 2,
        e.y - rect.top - boundingBoxLength / 2,
        boundingBoxLength,
        boundingBoxLength,
      );
      ctx.stroke();
    });

    img.src = imgUrl;
    let rect = canvas.getBoundingClientRect();
    console.log(rect.left + "," + rect.top);
  }, []);

  return (
    <>
      <div>
        <canvas ref={canvasRef}></canvas>
        <img src={imgUrl} alt="museum" />
      </div>
    </>
  );
}
