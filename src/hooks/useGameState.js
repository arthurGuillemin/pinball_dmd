import { useEffect, useRef, useState } from "react";
import socketService from "../service/socket.service";

const BACKEND_MESSAGE = {
  START_GAME: "start_game",
  BUMPER_HIT: "bumper_hit",
  SLINGSHOT_HIT: "slingshot_hit",
  LIGHT_SENSOR: "light_sensor",
  BALL_LOST: "ball_lost",
  GAME_OVER: "game_over",
  CONNECTED: "state_update",
  CARDS_DOWN: "cards_down",
};

const CUSTOM_MESSAGE = {
  BRAVO: "bravo",
};

const SCREEN_BY_TYPE = {
  [BACKEND_MESSAGE.CONNECTED]: "pressStart",
  [BACKEND_MESSAGE.START_GAME]: "go",
  [BACKEND_MESSAGE.LIGHT_SENSOR]: "default",
  [BACKEND_MESSAGE.SLINGSHOT_HIT]: "default",
  [BACKEND_MESSAGE.BUMPER_HIT]: "default",
  [BACKEND_MESSAGE.BALL_LOST]: "ball_lost",
  [BACKEND_MESSAGE.GAME_OVER]: "gameOver",
  [BACKEND_MESSAGE.CARDS_DOWN]: "cards_down",
  [CUSTOM_MESSAGE.BRAVO]: "bravo", // ✅ mapping explicite
};

const TRANSIENT_TYPES = new Set([
  BACKEND_MESSAGE.BALL_LOST,
  BACKEND_MESSAGE.START_GAME,
  CUSTOM_MESSAGE.BRAVO,
]);

const DEFAULT_SCREEN = "default";
const DELAY_FOR_TRANSIT_SCREEN = 800;
const BRAVO_THRESHOLD = 10;

const SCORING_TYPES = new Set([
  BACKEND_MESSAGE.BUMPER_HIT,
  BACKEND_MESSAGE.SLINGSHOT_HIT,
  BACKEND_MESSAGE.LIGHT_SENSOR,
]);

export function useGameState() {
  const [screen, setScreen] = useState("pressStart");
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(3);

  const delayTimer = useRef(null);
  const busyRef = useRef(false); // ✅ remplace la globale `busy`
  const consecutiveRef = useRef(0); // ✅ remplace la globale `initial_score`

  useEffect(() => {
    socketService.connect();

    const handleMessage = (data) => {
      console.log("[DMD] Message reçu:", data);

      // Mise à jour du score et des balles avant tout
      if (data.state?.score != null) {
        setScore(String(data.state.score));
      }
      if (data.state?.balls != null) {
        setBalls(data.state.balls);
      }

      // ✅ Calcul du BRAVO ici, toujours (même si busy),
      //    mais on n'affiche l'écran que si on n'est pas busy
      let isBravo = false;
      if (SCORING_TYPES.has(data.type)) {
        consecutiveRef.current += 1;
        if (consecutiveRef.current >= BRAVO_THRESHOLD) {
          consecutiveRef.current = 0;
          isBravo = true;
        }
      } else {
        consecutiveRef.current = 0; // reset si autre type de message
      }

      // Si un écran transitoire est en cours, on ignore le changement d'écran
      if (busyRef.current) return;

      const nextScreen = isBravo
        ? CUSTOM_MESSAGE.BRAVO
        : getScreenFromMessage(data);

      setScreen(nextScreen);

      if (TRANSIENT_TYPES.has(nextScreen)) {
        clearTimeout(delayTimer.current);
        busyRef.current = true;
        delayTimer.current = setTimeout(() => {
          busyRef.current = false;
          setScreen(DEFAULT_SCREEN);
        }, DELAY_FOR_TRANSIT_SCREEN);
      }
    };

    socketService.onScreenMessage(handleMessage);

    return () => {
      socketService.disconnect();
      clearTimeout(delayTimer.current);
    };
  }, []);

  return { screen, score, balls };
}

function getScreenFromMessage(data) {
  if (data.type === BACKEND_MESSAGE.CONNECTED) {
    return data.state?.isRunning ? DEFAULT_SCREEN : "pressStart";
  }
  return SCREEN_BY_TYPE[data.type] ?? DEFAULT_SCREEN;
}
