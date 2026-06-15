import { useEffect, useState } from "react";
import socketService from "../service/socket.service";

export function useGameState() {
  const MESSAGE_TYPES = {
    START_GAME: "start_game",
    BUMPER_HIT: "bumper_hit",
    SLINGSHOT_HIT: "slingshot_hit",
    LIGHT_SENSOR: "light_sensor",
    BALL_LOST: "ball_lost",
    GAME_OVER: "gameOver",
  };
  const [screenMessage, setScreenMessage] = useState("gameOver");

  console.log(screenMessage);
  useEffect(() => {
    socketService.connect();

    socketService.onScreenMessage((data) => {
      console.log(data);
      if (data.type === MESSAGE_TYPES.START_GAME) {
        setScreenMessage("go");
      }
      if (data.type === MESSAGE_TYPES.BUMPER_HIT) {
        setScreenMessage("bumper_hit");
      }
      if (data.type === MESSAGE_TYPES.SLINGSHOT_HIT) {
        setScreenMessage("slingshot_hit");
      }
      if (data.type === MESSAGE_TYPES.LIGHT_SENSOR) {
        setScreenMessage("light_sensor");
      }
      if (data.type === MESSAGE_TYPES.BALL_LOST) {
        setScreenMessage("ball_lost");
      }
      if (data.type === MESSAGE_TYPES.GAME_OVER) {
        setScreenMessage("gameOver");
      }
    });
  }, []);

  return screenMessage;
}
