export default function TopBar() {
  const topBarTitles = ["Go back"];

  const topBarItems = topBarTitles.map((item, index) => (
    <li key={index}>
      <a href="lk">{item}</a>
    </li>
  ));

  return (
    <nav>
      <ul>{topBarItems}</ul>
    </nav>
  );
}
