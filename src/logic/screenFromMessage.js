import {
  DEFAULT_SCREEN,
  SOCKET_MESSAGES,
  SCREEN_BY_TYPE,
  TRANSITIONAL_TYPES,
  SCORING_MESSAGES,
} from "./SCREEN.CONSTANTS.js";

export const getScreenFromMessage = (data) => {
  if (data.type === SOCKET_MESSAGES.CONNECTED) {
    return data.state?.isRunning ? DEFAULT_SCREEN : "pressStart";
  }
  return SCREEN_BY_TYPE[data.type] ?? DEFAULT_SCREEN;
};

export const getTransitionalMessageType = (data) => {
  if (!TRANSITIONAL_TYPES.has(data.type)) {
    return false;
  }
  return true;
};

export const getScoringMessageType = (data) => {
  if (!SCORING_MESSAGES.has(data.type)) {
    return false;
  }
  return true;
};
