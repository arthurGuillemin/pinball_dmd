import { describe, it, expect } from "vitest";
import { isBravoMessage } from "../logic/handleFansyMessage.js";

describe("Screen From Message", () => {
  for (let i = 0; i < 9; i++) {
    isBravoMessage({
      type: "slingshot_hit",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
  }
  it("Schould get True After Trigger Bravo Score", () => {
    const result = isBravoMessage({
      type: "slingshot_hit",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBeTruthy();
  });
  it("Schould get false for Trigger + 1 case ", () => {
    const result = isBravoMessage({
      type: "slingshot_hit",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBeFalsy();
  });
});
