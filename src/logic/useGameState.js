import { useEffect, useRef, useState } from "react";
import socketService from "../service/socket.service";

import { getDmdInfoIncludingFrancyMessage } from "./getDmdInfo";
import { DEFAULT_SCREEN } from "./SCREEN.CONSTANTS.js";

const DELAY = 900;

export function useGameState() {
  const [screen, setScreen] = useState("pressStart");
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState(3);
  const delayTimer = useRef(null);

  const handleTransitionalScreen = () => {
    delayTimer.current = setTimeout(() => {
      setScreen(DEFAULT_SCREEN);
    }, DELAY);
  };

  useEffect(() => {
    socketService.connect();

    const handleMessage = async (data) => {
      console.log("[DMD] Message reçu from handle2:", data);
      clearTimeout(delayTimer.current);

      const { score, balls, screen, isTransitionalMessage } =
        getDmdInfoIncludingFrancyMessage(data);

      setScore(score);
      setBalls(balls);
      setScreen(screen);
      if (isTransitionalMessage) {
        handleTransitionalScreen();
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
