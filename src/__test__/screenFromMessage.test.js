import { describe, it, expect } from "vitest";

import {
  getScreenFromMessage,
  getTransitionalMessageType,
  getScoringMessageType,
} from "../logic/screenFromMessage.js";

describe("Screen From Message", () => {
  it("Schould get Screen to pressStart on state_update isRunning False", () => {
    expect(
      getScreenFromMessage({
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
    ).toBe("pressStart");
  });
  it("Schould get Screen to pressStart on state_update isRunning True", () => {
    expect(
      getScreenFromMessage({
        type: "state_update",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("default");
  });
  it("Schould get Go Message", () => {
    expect(
      getScreenFromMessage({
        type: "start_game",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("go");
  });
  it("Schould get default on bumber_hit", () => {
    expect(
      getScreenFromMessage({
        type: "bumper_hit",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("default");
  });
  it("Schould get default on slingshot_hit", () => {
    expect(
      getScreenFromMessage({
        type: "slingshot_hit",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("default");
  });
  it("Schould get default with light_sensor", () => {
    expect(
      getScreenFromMessage({
        type: "light_sensor",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("default");
  });
  it("Schould get ball_lost", () => {
    expect(
      getScreenFromMessage({
        type: "ball_lost",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("ball_lost");
  });
  it("Schould get game_over", () => {
    expect(
      getScreenFromMessage({
        type: "game_over",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 542,
        },
      }),
    ).toBe("game_over");
  });
});

describe("Handle Message Screen Transitoire", () => {
  const DELAY = 1000;

  it("should get Transitional Screen True (for start_game)", () => {
    const result = getTransitionalMessageType({
      type: "start_game",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBe(true);
  });
  it("should get Transitional Screen True (for ball_lost)", () => {
    const result = getTransitionalMessageType({
      type: "ball_lost",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBe(true);
  });
  it("should get Transitional Screen False (for game_over)", () => {
    const result = getTransitionalMessageType({
      type: "game_over",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBe(false);
  });
  it("should get Transitional Screen False (for state_update)", () => {
    const result = getTransitionalMessageType({
      type: "state_update",
      state: {
        avatar: "cuphead",
        balls: 2,
        currentPlayer: null,
        isRunning: true,
        lightsActivated: [],
        score: 542,
      },
    });
    expect(result).toBe(false);
  });
});

describe("Test getScoringMessageType", () => {
  it("Should get True with slingshot_hit", () => {
    const result = getScoringMessageType({
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
  it("Should get True with light_sensor", () => {
    const result = getScoringMessageType({
      type: "light_sensor",
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
  it("Should get True with bumper_hit", () => {
    const result = getScoringMessageType({
      type: "bumper_hit",
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
  it("Should get False with ball_lost", () => {
    const result = getScoringMessageType({
      type: "ball_lost",
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
