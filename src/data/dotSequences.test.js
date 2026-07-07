import { describe, it, expect } from "vitest";
import { getFramesFromText } from "./dotSequences";

describe("getFramesFromText", () => {
  it("retourne tableau vide pour texte vide", () => {
    expect(getFramesFromText("")).toEqual([]);
  });

  it("ignore casse (majuscules/minuscules donnent meme resultat)", () => {
    expect(getFramesFromText("go")).toEqual(getFramesFromText("GO"));
  });

  it("retourne motif vide pour caractere non supporte", () => {
    const frames = getFramesFromText("A-B");
    expect(frames[1]).toEqual([]);
  });
});
