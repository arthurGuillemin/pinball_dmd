import { getBallsFromSocket, getScoreFromSocket } from "./messageHandler";
import { getBravoMessage } from "./handleFansyMessage.js";

import {
  getScreenFromMessage,
  getTransitionalMessageType,
} from "./screenFromMessage";

export const getDmdInfo = (data) => {
  const score = getScoreFromSocket(data);
  const balls = getBallsFromSocket(data);
  let screen = getScreenFromMessage(data);
  let isTransitionalMessage = getTransitionalMessageType(data);
  return {
    score,
    balls,
    screen,
    isTransitionalMessage,
  };
};

export const getDmdInfoIncludingFrancyMessage = (data) => {
  const fancy = getBravoMessage(data);
  if (fancy) {
    return fancy;
  }
  return getDmdInfo(data);
};
