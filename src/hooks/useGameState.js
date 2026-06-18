import { useEffect, useRef, useState } from "react";
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

// Écrans qui doivent revenir à "default" après un délai
const TRANSIENT_TYPES = new Set([
  MESSAGE_TYPES.BALL_LOST,
  MESSAGE_TYPES.START_GAME,
]);

const DEFAULT_SCREEN = "default";
const DELAY = 1500;

function getScreenFromMessage(data) {
  if (data.type === MESSAGE_TYPES.CONNECTED) {
    return data.state?.isRunning ? DEFAULT_SCREEN : "pressStart";
  }
  return SCREEN_BY_TYPE[data.type] ?? DEFAULT_SCREEN;
}

export function useGameState() {
  const [screen, setScreen] = useState("pressStart");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const delayTimer = useRef(null); // ✅ ref stable entre les renders

  useEffect(() => {
    socketService.connect();

    const handleMessage = (data) => {
      console.log("[DMD] Message reçu:", data);

      // ✅ Mise à jour du score uniquement si disponible
      if (data.state?.score != null) {
        setScore(data.state.score.toString());
      }

      if (data.state?.lives != null) {
        setLives(data.state.lives);
      }

      const nextScreen = getScreenFromMessage(data);
      setScreen(nextScreen);

      clearTimeout(delayTimer.current);

      // ✅ Retour à "default" uniquement pour les écrans transitoires
      if (TRANSIENT_TYPES.has(data.type)) {
        clearTimeout(delayTimer.current);
        delayTimer.current = setTimeout(() => {
          setScreen(DEFAULT_SCREEN);
        }, DELAY);
      }
    };

    socketService.onScreenMessage(handleMessage);

    return () => {
      socketService.disconnect();
      clearTimeout(delayTimer.current);
    };
  }, []);

  return { screen, score, lives };
}
