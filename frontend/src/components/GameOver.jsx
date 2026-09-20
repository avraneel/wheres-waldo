export function GameOver({ finalTime }) {
  return (
    <dialog open>
      <form action="" method="post">
        <h2>Congrats you found them all!</h2>
        <label htmlFor="name">Enter your name: </label>
        <input type="text" name="name" id="name" />
        <label htmlFor="time">Time Taken: {finalTime}</label>
      </form>
      <button>Close</button>
    </dialog>
  );
}
