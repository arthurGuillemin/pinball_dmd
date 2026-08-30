import { describe, it, expect } from "vitest";

import { getDmdInfo } from "../logic/getDmdInfo";

describe("Test GetDMDInfo", () => {
  it("Should get ", () => {
    expect(
      getDmdInfo({
        type: "state_update",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: false,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toEqual({
      balls: 2,
      score: "542",
      isTransitionalMessage: false,
      screen: "pressStart",
    });
  });
});

describe("Test FansyMessage ", () => {
  it("Should get Bravo Message after getting the BRAVO_TRIGGER_SCORE ", () => {
    const json = {
      type: "bumper_hit",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: false,
        lightsActivated: [],
        score: 542,
      },
    };
    expect(getDmdInfo(json)).toEqual({
      balls: 2,
      score: "542",
      isTransitionalMessage: false,
      screen: "default",
    });
  });
});
