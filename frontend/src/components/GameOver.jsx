import { useEffect, useRef, useState } from "react";
import Leaderboard from "./Leaderboard";

import { url } from "./globals";

export default function GameOver({ gameOver, finalTime }) {
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const time = finalTime;

    const body = {
      name,
      time,
    };

    try {
      const response = await fetch(`${url}/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.message === "done") {
        const resp = await fetch(`${url}/leaderboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const board = await resp.json();
        dialogRef.current.close();
        setScores(board);
        setSubmitted(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const dialogRef = useRef(null);

  useEffect(() => {
    if (gameOver) {
      const dialog = dialogRef.current;
      dialog.showModal();
    }
  }, [gameOver]);

  return (
    <>
      <dialog ref={dialogRef}>
        <form action="" method="post" onSubmit={handleSubmit}>
          <h2>Congrats you found them all!</h2>
          <label htmlFor="name">Enter your name*: </label>
          <input type="text" name="name" id="name" required />
          <p htmlFor="time">Time Taken: {finalTime}</p>
          <button>Submit</button>
        </form>
        <button onClick={() => dialogRef.current.close()}>Close</button>
      </dialog>
      {submitted && <Leaderboard scores={scores} />}
    </>
  );
}
