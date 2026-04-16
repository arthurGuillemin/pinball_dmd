const buildBorderBlinkSequence = (cols, rows) => {
  const indices = [];

  for (let col = 0; col < cols; col += 1) {
    indices.push(col);
    indices.push((rows - 1) * cols + col);
  }

  for (let row = 1; row < rows - 1; row += 1) {
    indices.push(row * cols);
    indices.push(row * cols + (cols - 1));
  }

  return [indices, []];
};

const buildBorderPath = (cols, rows) => {
  const path = [];

  for (let col = 0; col < cols; col += 1) {
    path.push(col);
  }

  for (let row = 1; row < rows; row += 1) {
    path.push(row * cols + (cols - 1));
  }

  for (let col = cols - 2; col >= 0; col -= 1) {
    path.push((rows - 1) * cols + col);
  }

  for (let row = rows - 2; row > 0; row -= 1) {
    path.push(row * cols);
  }

  return path;
};

const buildBorderFrameSequence = (
  cols,
  rows,
  thickness = 2,
  alternate = false,
) => {
  const indicesA = new Set();
  const indicesB = new Set();

  for (let t = 0; t < thickness; t += 1) {
    const topRow = t;
    const bottomRow = rows - 1 - t;

    for (let col = 0; col < cols; col += 1) {
      const useA = (col + topRow) % 2 === 0;
      const target = alternate && !useA ? indicesB : indicesA;
      target.add(topRow * cols + col);

      const useABottom = (col + bottomRow) % 2 === 0;
      const targetBottom = alternate && !useABottom ? indicesB : indicesA;
      targetBottom.add(bottomRow * cols + col);
    }

    for (let row = t; row < rows - t; row += 1) {
      const useA = (row + t) % 2 === 0;
      const target = alternate && !useA ? indicesB : indicesA;
      target.add(row * cols + t);

      const useARight = (row + (cols - 1 - t)) % 2 === 0;
      const targetRight = alternate && !useARight ? indicesB : indicesA;
      targetRight.add(row * cols + (cols - 1 - t));
    }
  }

  if (!alternate) {
    return [Array.from(indicesA)];
  }

  return [Array.from(indicesA), Array.from(indicesB)];
};

const buildHorizontalBorderSequence = (
  cols,
  rows,
  thickness = 2,
  alternate = false,
) => {
  const indicesA = new Set();
  const indicesB = new Set();

  for (let t = 0; t < thickness; t += 1) {
    const topRow = t;
    const bottomRow = rows - 1 - t;

    for (let col = 0; col < cols; col += 1) {
      const useA = (col + topRow) % 2 === 0;
      const targetTop = alternate && !useA ? indicesB : indicesA;
      targetTop.add(topRow * cols + col);

      const useABottom = (col + bottomRow) % 2 === 0;
      const targetBottom = alternate && !useABottom ? indicesB : indicesA;
      targetBottom.add(bottomRow * cols + col);
    }
  }

  if (!alternate) {
    return [Array.from(indicesA)];
  }

  return [Array.from(indicesA), Array.from(indicesB)];
};

export {
  buildBorderBlinkSequence,
  buildBorderPath,
  buildBorderFrameSequence,
  buildHorizontalBorderSequence,
};
