import { useMemo } from "react";

function useDmdModes({ text, borderBlink, borderSnake }) {
  const normalizedText = useMemo(() => {
    if (typeof text !== "string") {
      return "";
    }
    return text.toUpperCase();
  }, [text]);

  const isJackpot = useMemo(
    () => normalizedText.includes("JACKPOT"),
    [normalizedText],
  );

  const isScore = useMemo(() => {
    if (typeof text !== "string") {
      return false;
    }
    return /^[0-9]+$/.test(text);
  }, [text]);

  const isGameOver = useMemo(
    () => normalizedText.includes("GAME OVER"),
    [normalizedText],
  );

  const shouldBlink = useMemo(() => {
    if (isScore || isJackpot) {
      return false;
    }
    if (typeof borderBlink === "boolean") {
      return borderBlink;
    }
    if (!normalizedText) {
      return false;
    }
    return (
      normalizedText.includes("BRAVO") || normalizedText.includes("JACKPOT")
    );
  }, [borderBlink, isScore, isJackpot, normalizedText]);

  const shouldSnake = useMemo(() => {
    if (isScore || isJackpot) {
      return false;
    }
    if (typeof borderSnake === "boolean") {
      return borderSnake;
    }
    if (!normalizedText) {
      return false;
    }
    return normalizedText.includes("READY");
  }, [borderSnake, isScore, isJackpot, normalizedText]);

  return { isJackpot, isScore, isGameOver, shouldBlink, shouldSnake };
}

export default useDmdModes;
