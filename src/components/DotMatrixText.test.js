import { describe, it, expect } from "vitest";
import { toGridIndex, buildTextFrame, buildScrollFrames } from "./dotMatrixUtils";

describe("toGridIndex", () => {
  it("applique formule ligne * colonnes + colonne", () => {
    expect(toGridIndex(0, 0, 10)).toBe(0);
    expect(toGridIndex(1, 0, 10)).toBe(10);
  });
});

describe("buildTextFrame (affichage statique)", () => {
  it("retourne tableau vide pour texte vide", () => {
    expect(
      buildTextFrame({
        text: "",
        cols: 40,
        rows: 22,
        letterGap: 0,
        align: "center",
      }),
    ).toEqual([]);
  });

  it("produit jamais indice dupliquer", () => {
    const indices = buildTextFrame({
      text: "BRAVO",
      cols: 40,
      rows: 22,
      letterGap: 0,
      align: "center",
    });
    const uniqueIndices = new Set(indices);
    expect(uniqueIndices.size).toBe(indices.length);
  });
});

describe("buildScrollFrames (affichage defilant)", () => {
  it("retourne tableau vide pour texte vide", () => {
    expect(
      buildScrollFrames({ text: "", cols: 40, rows: 22, letterGap: 1 }),
    ).toEqual([]);
  });

  it("genere plusieurs images pour creer effet de defilement", () => {
    const frames = buildScrollFrames({
      text: "GO",
      cols: 40,
      rows: 22,
      letterGap: 1,
    });
    expect(frames.length).toBeGreaterThan(1);
  });
});
