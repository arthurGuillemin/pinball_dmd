import { useEffect, useState } from "react";
import socketService from "../service/socket.service";

const MESSAGE_TYPES = {
  START_GAME: "start_game",
  BUMPER_HIT: "bumper_hit",
  SLINGSHOT_HIT: "slingshot_hit",
  LIGHT_SENSOR: "light_sensor",
  BALL_LOST: "ball_lost",
  GAME_OVER: "game_over",
  CONNECTED: "state_update",
};

const SCREEN_BY_TYPE = {
  [MESSAGE_TYPES.CONNECTED]: "pressStart",
  [MESSAGE_TYPES.START_GAME]: "go",
  [MESSAGE_TYPES.LIGHT_SENSOR]: "default",
  [MESSAGE_TYPES.SLINGSHOT_HIT]: "default",
  [MESSAGE_TYPES.BUMPER_HIT]: "default",
  [MESSAGE_TYPES.BALL_LOST]: "ball_lost",
  [MESSAGE_TYPES.GAME_OVER]: "gameOver",
};

const DEFAULT_SCREEN = "default";

function getScreenFromMessage(data) {
  if (data.type === MESSAGE_TYPES.CONNECTED) {
    return data.state?.isRunning ? DEFAULT_SCREEN : "pressStart";
  }
  return SCREEN_BY_TYPE[data.type] ?? DEFAULT_SCREEN;
}

export function useGameState() {
  const [screen, setScreen] = useState("ready");
  const [score, setScore] = useState("0");

  useEffect(() => {
    socketService.connect();

    const handleMessage = (data) => {
      console.log("[DMD] Message reçu:", data);
      setScore(data.state.score.toString());
      setScreen(getScreenFromMessage(data));
    };

    socketService.onScreenMessage(handleMessage);
    return () => socketService.disconnect();
  }, []);
  return {
    screen,
    score,
  };
}
