import "./App.css";
import DMD from "./components/Dot MatrixScreen";
import { DMD_MESSAGES, getDMDRandomMessage } from "./data/messages";
import { useGameState } from "./logic/useGameState.js";
import {
  DEFAULT_SCREEN,
  SCREEN_BY_TYPE,
  SOCKET_MESSAGES,
  FANSY_MESSAGE,
} from "./logic/SCREEN.CONSTANTS.js";

function buildScreenConfig({ score, balls }) {
  return {
    [DEFAULT_SCREEN]: { text: score, scroll: false, lives: balls },
    [FANSY_MESSAGE.BRAVO]: {
      text: DMD_MESSAGES.bravo,
      scroll: false,
      lives: 0,
    },
    [SCREEN_BY_TYPE[SOCKET_MESSAGES.GAME_OVER]]: {
      text: DMD_MESSAGES.gameOver,
      lives: 0,
    },
    [SCREEN_BY_TYPE[SOCKET_MESSAGES.CONNECTED]]: {
      text: DMD_MESSAGES.pressStart,
      lives: 0,
    },
    [SCREEN_BY_TYPE[SOCKET_MESSAGES.START_GAME]]: {
      text: DMD_MESSAGES.go,
      scroll: false,
      lives: 0,
    },
    [SCREEN_BY_TYPE[SOCKET_MESSAGES.BALL_LOST]]: {
      text: getDMDRandomMessage("ball_lost"),
      scroll: false,
      lives: 0,
    },
    [SCREEN_BY_TYPE[SOCKET_MESSAGES.ALL_CARD]]: {
      text: DMD_MESSAGES.jackpot,
      scroll: true,
      lives: 0,
    },
  };
}

function App() {
  let { screen, score, balls } = useGameState();
  screen = DEFAULT_SCREEN;
  const config = buildScreenConfig({ score, balls })[screen];
  return <main className="app">{config && <DMD {...config} />}</main>;

  // return (
  //   <main className="app">
  //     {screen === DEFAULT_SCREEN && (<DMD text={score} scroll={false} lives={balls} />)}
  //     {screen === FANSY_MESSAGE.BRAVO && (<DMD text={DMD_MESSAGES.bravo} scroll={false} lives={0} />)}
  //     {screen === SCREEN_BY_TYPE[SOCKET_MESSAGES.GAME_OVER] && <DMD text={DMD_MESSAGES.gameOver} lives={0} />}
  //     {screen === SCREEN_BY_TYPE[SOCKET_MESSAGES.CONNECTED] && (<DMD text={DMD_MESSAGES.pressStart} lives={0} />)}
  //     {screen === SCREEN_BY_TYPE[SOCKET_MESSAGES.START_GAME] && (<DMD text={DMD_MESSAGES.go} scroll={false} lives={0} />)}
  //     {screen === SCREEN_BY_TYPE[SOCKET_MESSAGES.BALL_LOST] && (<DMD text={getDMDRandomMessage("ball_lost")} scroll={false} lives={0} />)}
  //     {screen === SCREEN_BY_TYPE[SOCKET_MESSAGES.ALL_CARD] && (<DMD text={DMD_MESSAGES.jackpot} scroll={true} lives={0} />)}

  //     {/* <DMD text={DMD_MESSAGES.pressStart} lives={2} /> */}
  //   </main>
  // );
}

export default App;
