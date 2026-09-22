import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Result from "./Result";
import GameOver from "./GameOver";
import { characters } from "./globals";
import styles from "../css/app.module.css";
import { useState } from "react";

export default function App() {
  // console.log("app render");
  const [status, setStatus] = useState("unfound");
  const [gameOver, setGameOver] = useState(false);
  const [chars, setChars] = useState(characters);
  const [finalTime, setFinalTime] = useState("00 : 00");
  return (
    <div className={styles.app}>
      <TopBar gameOver={gameOver} setFinalTime={setFinalTime} />
      <Sidebar chars={chars} />
      <Canvas
        status={status}
        setStatus={setStatus}
        chars={chars}
        setChars={setChars}
        setGameOver={setGameOver}
      />
      <Result gameOver={gameOver} />
      <GameOver gameOver={gameOver} finalTime={finalTime} />
    </div>
  );
}
