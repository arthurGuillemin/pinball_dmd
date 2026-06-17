import "./App.css";
import DMD from "./components/Dot MatrixScreen";
import { DMD_MESSAGES, getDMDRandomMessage } from "./data/messages";

import { useGameState } from "./hooks/useGameState";

function App() {
  let { screen, score } = useGameState();

  return (
    <main className="app">
      {screen === "default" && <DMD text={score} scroll={false} />}
      {screen === "gameOver" && <DMD text={DMD_MESSAGES.gameOver} />}
      {screen === "pressStart" && <DMD text={DMD_MESSAGES.pressStart} />}
      {screen === "bravo" && <DMD text={DMD_MESSAGES.bravo} scroll={false} />}
      {screen === "go" && <DMD text={DMD_MESSAGES.go} scroll={false} />}
      {screen === "ball_lost" && (
        <DMD text={getDMDRandomMessage("ball_lost")} scroll={false} />
      )}
    </main>
  );
}

export default App;
