import { useEffect, useMemo, useState } from "react";

function useSnakeFrames({ shouldSnake, borderPath, snakeLength, interval }) {
  const [snakeStep, setSnakeStep] = useState(0);

  useEffect(() => {
    if (!shouldSnake || !borderPath.length) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSnakeStep((prev) => (prev + 1) % borderPath.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [shouldSnake, borderPath.length, interval]);

  const snakeFrames = useMemo(() => {
    if (!borderPath.length || !snakeLength) {
      return [];
    }

    return Array.from({ length: snakeLength }, (_, index) => {
      const offset =
        (snakeStep - index + borderPath.length) % borderPath.length;
      return [borderPath[offset]];
    });
  }, [borderPath, snakeStep, snakeLength]);

  return { snakeFrames };
}

export default useSnakeFrames;
