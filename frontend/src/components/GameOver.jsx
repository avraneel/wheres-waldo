export default function GameOver({ gameOver, finalTime }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("query");
    const time = finalTime;

    const body = {
      name,
      time,
    };
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
  }

  return (
    gameOver && (
      <dialog open>
        <form action="" method="post" onSubmit={handleSubmit}>
          <h2>Congrats you found them all!</h2>
          <label htmlFor="name">Enter your name*: </label>
          <input type="text" name="name" id="name" required />
          <p htmlFor="time">Time Taken: {finalTime}</p>
        </form>
        <button>Close</button>
      </dialog>
    )
  );
}
