import { describe, it, expect } from "vitest";

import { getDmdInfo } from "../../logic/getDmdInfo";

describe("Test (End To End)  Recevoir un Json du Back et Expect Le dernier Resultat", () => {
  it("Test with state_update Event", () => {
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
  it("Test with start_game Event", () => {
    expect(
      getDmdInfo({
        type: "start_game",
        state: {
          avatar: "cuphead",
          balls: 3,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 0,
        },
      }),
    ).toEqual({
      balls: 3,
      score: "0",
      isTransitionalMessage: true,
      screen: "go",
    });
  });
  it("Test with bumper_hit Event", () => {
    expect(
      getDmdInfo({
        type: "bumper_hit",
        state: {
          avatar: "cuphead",
          balls: 3,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 400,
        },
      }),
    ).toEqual({
      balls: 3,
      score: "400",
      isTransitionalMessage: false,
      screen: "default",
    });
  });
  it("Test with slingshot_hit Event", () => {
    expect(
      getDmdInfo({
        type: "slingshot_hit",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 550,
        },
      }),
    ).toEqual({
      balls: 2,
      score: "550",
      isTransitionalMessage: false,
      screen: "default",
    });
  });
  it("Test with light_sensor Event", () => {
    expect(
      getDmdInfo({
        type: "light_sensor",
        state: {
          avatar: "cuphead",
          balls: 2,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 650,
        },
      }),
    ).toEqual({
      balls: 2,
      score: "650",
      isTransitionalMessage: false,
      screen: "default",
    });
  });
  it("Test with ball_lost Event", () => {
    expect(
      getDmdInfo({
        type: "ball_lost",
        state: {
          avatar: "cuphead",
          balls: 1,
          currentPlayer: null,
          isRunning: true,
          lightsActivated: [],
          score: 650,
        },
      }),
    ).toEqual({
      balls: 1,
      score: "650",
      isTransitionalMessage: true,
      screen: "ball_lost",
    });
  });
  it("Test with game_over Event", () => {
    expect(
      getDmdInfo({
        type: "game_over",
        state: {
          avatar: "cuphead",
          balls: 0,
          currentPlayer: null,
          isRunning: false,
          lightsActivated: [],
          score: 1500,
        },
      }),
    ).toEqual({
      balls: 0,
      score: "1500",
      isTransitionalMessage: false,
      screen: "game_over",
    });
  });
});
