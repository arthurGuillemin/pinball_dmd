const offsetFrame = (frame, cols, rows, fireworksGrid, rowOffset, colOffset) =>
  frame
    .map((index) => {
      const row = Math.floor(index / fireworksGrid);
      const col = index % fireworksGrid;
      return (row + rowOffset) * cols + (col + colOffset);
    })
    .filter((index) => index >= 0 && index < cols * rows);

const buildFireworksSequence = ({ dotSequences, gridCols, gridRows, fireworksGrid }) => {
  const fireworksA = dotSequences.fireworksA?.frames ?? [];
  const fireworksB = dotSequences.fireworksB?.frames ?? [];
  const fireworksC = dotSequences.fireworksC?.frames ?? [];

  if (!fireworksA.length && !fireworksB.length && !fireworksC.length) {
    return [];
  }

  const topRow = 2;
  const topColLeft = 2;
  const topColRight = Math.max(0, gridCols - fireworksGrid - 2);
  const middleRow = Math.max(0, Math.floor((gridRows - fireworksGrid) / 2));
  const middleCol = Math.max(0, Math.floor((gridCols - fireworksGrid) / 2));
  const bottomRow = Math.max(0, gridRows - fireworksGrid - 2);
  const bottomColLeft = 2;
  const bottomColRight = Math.max(0, gridCols - fireworksGrid - 2);
  const frameCount = Math.max( fireworksA.length, fireworksB.length, fireworksC.length);
  const sequence = [];

  for (let i = 0; i < frameCount; i += 1) {
    const frameA = fireworksA.length ? fireworksA[i % fireworksA.length] : [];
    const frameB = fireworksB.length ? fireworksB[i % fireworksB.length] : [];
    const frameC = fireworksC.length ? fireworksC[i % fireworksC.length] : [];
    const indices = [
      ...offsetFrame( frameA, gridCols, gridRows, fireworksGrid, topRow, topColLeft ),
      ...offsetFrame( frameA, gridCols, gridRows, fireworksGrid, bottomRow, bottomColRight ),
      ...offsetFrame( frameB, gridCols, gridRows, fireworksGrid, topRow, topColRight ),
      ...offsetFrame( frameB, gridCols, gridRows, fireworksGrid, bottomRow, bottomColLeft ),
      ...offsetFrame( frameC, gridCols, gridRows, fireworksGrid, middleRow, middleCol ),
    ];
    sequence.push(indices);
  }

  return sequence;
};

export { buildFireworksSequence };
