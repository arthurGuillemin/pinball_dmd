import { getScoringMessageType } from "./screenFromMessage.js";
import { getScoreFromSocket, getBallsFromSocket } from "./messageHandler.js";
import { FANSY_MESSAGE } from "./SCREEN.CONSTANTS.js";

const BRAVO_TRIGGER_SCORE = 10;
let HITS_IN_ROW = 0;

export const isBravoMessage = (data) => {
  const isScoringMessage = getScoringMessageType(data);
  if (isScoringMessage) {
    HITS_IN_ROW++;
  } else {
    HITS_IN_ROW = 0;
  }
  if (HITS_IN_ROW >= BRAVO_TRIGGER_SCORE) {
    HITS_IN_ROW = 0;
    return true;
  }
  return false;
};

export const getBravoMessage = (data) => {
  if (!isBravoMessage(data)) {
    return false;
  }
  const score = getScoreFromSocket(data);
  const balls = getBallsFromSocket(data);
  const screen = FANSY_MESSAGE.BRAVO;
  const isTransitionalMessage = true;
  return {
    score,
    balls,
    screen,
    isTransitionalMessage,
  };
};
