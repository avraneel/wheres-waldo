export default function Leaderboard({ scores }) {
  const tableBody = scores.forEach((el) => {
    return (
      <tr>
        <td>{el.name}</td>
        <td>
          {el.mins} : {el.seconds}
        </td>
      </tr>
    );
  });

  return (
    <div>
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
    </div>
  );
}
