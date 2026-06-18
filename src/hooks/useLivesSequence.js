import { useMemo } from "react";

function getLifeDots(lifeIndex, cols) {
  const centerCol = 4 + lifeIndex * 5;
  const centerRow = 17;
  return [
    (centerRow - 1) * cols + centerCol,
    centerRow * cols + (centerCol - 1),
    centerRow * cols + centerCol,
    centerRow * cols + (centerCol + 1),
    (centerRow + 1) * cols + centerCol,
  ];
}

export function useLivesSequence(lives, cols = 40) {
  return useMemo(() => {
    const dots = [];
    for (let i = 0; i < Math.min(lives, 3); i++) {
      dots.push(...getLifeDots(i, cols));
    }
    return [dots];
  }, [lives, cols]);
}
