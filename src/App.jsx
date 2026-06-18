import "./App.css";
import DMD from "./components/Dot MatrixScreen";
import { DMD_MESSAGES, getDMDRandomMessage } from "./data/messages";

import { useGameState } from "./hooks/useGameState";

function App() {
  let { screen, score, balls } = useGameState();

  return (
    <main className="app">
      {screen === "default" && (
        <DMD text={score} scroll={false} lives={balls} />
      )}
      {screen === "gameOver" && <DMD text={DMD_MESSAGES.gameOver} lives={0} />}
      {screen === "pressStart" && (
        <DMD text={DMD_MESSAGES.pressStart} lives={0} />
      )}
      {screen === "bravo" && (
        <DMD text={DMD_MESSAGES.bravo} scroll={false} lives={balls} />
      )}
      {screen === "go" && (
        <DMD text={DMD_MESSAGES.go} scroll={false} lives={0} />
      )}
      {screen === "ball_lost" && (
        <DMD text={getDMDRandomMessage("ball_lost")} scroll={false} lives={0} />
      )}
      {/* <DMD text={DMD_MESSAGES.pressStart} lives={2} /> */}
    </main>
  );
}

export default App;
