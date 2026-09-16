import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Result from "./Result";
import styles from "../css/app.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <Sidebar />
      <Canvas />
      <Result />
    </div>
  );
}
