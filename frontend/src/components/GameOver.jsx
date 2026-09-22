export default function GameOver({ gameOver, finalTime }) {
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
    console.log(body);
    try {
      const response = await fetch("http://localhost:3000/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    gameOver && (
      <dialog open>
        <form action="" method="post" onSubmit={handleSubmit}>
          <h2>Congrats you found them all!</h2>
          <label htmlFor="name">Enter your name*: </label>
          <input type="text" name="name" id="name" required />
          <p htmlFor="time">Time Taken: {finalTime}</p>
          <button>Submit</button>
        </form>
        <button>Close</button>
      </dialog>
    )
  );
}
