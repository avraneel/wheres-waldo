import { useEffect, useRef } from "react";

export default function Leaderboard({ scores }) {
  const leadRef = useRef(null);

  const tableBody = scores.map((el, ind) => (
    <tr key={ind}>
      <td>{el.name}</td>
      <td>
        {el.mins} : {String(el.seconds).padStart(2, "0")}
      </td>
    </tr>
  ));

  useEffect(() => {
    const lead = leadRef.current;
    lead.showModal();
  }, []);

  function handleClick() {
    window.location.reload();
  }

  return (
    <dialog ref={leadRef}>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <button onClick={handleClick}>New Game</button>
    </dialog>
  );
}
