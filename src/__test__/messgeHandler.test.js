import { describe, it, expect } from "vitest";

import {
  getScoreFromSocket,
  getBallsFromSocket,
} from "../logic/messageHandler.js";

const socketJson = {
  type: "game_over",
  state: {
    avatar: "cuphead",
    balls: 2,
    currentPlayer: null,
    isRunning: false,
    lightsActivated: [],
    score: 542,
  },
};

describe("Unit Test for file Message Handler", () => {
  it("Schould get String of Score = 542", () => {
    expect(getScoreFromSocket(socketJson)).toBe("542");
  });
  it("Schould return null if json unkown", () => {
    expect(getScoreFromSocket({})).toBe(null);
  });
  it("Schould get Number of balls = 2", () => {
    expect(getBallsFromSocket(socketJson)).toBe(2);
  });
  it("Schould return null", () => {
    expect(getBallsFromSocket({})).toBe(null);
  });
});
