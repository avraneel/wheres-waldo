import { useEffect, useRef } from "react";

export default function Leaderboard({ scores }) {
  const leadRef = useRef(null);

  const tableBody = scores.map((el, ind) => (
    <tr key={ind}>
      <td>{el.name}</td>
      <td>
        {el.mins} : {el.seconds}
      </td>
    </tr>
  ));

  useEffect(() => {
    const lead = leadRef.current;
    lead.showModal();
  }, []);

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
      <button>New Game</button>
    </dialog>
  );
}
