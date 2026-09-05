import { useEffect, useRef } from "react";
import imgUrl from "./assets/museum.png";

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
      console.log(e.x + "," + e.y);
    });

    img.src = imgUrl;
  }, []);

  return (
    <>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}
