import { getFramesFromText } from "../data/dotSequences";

const LETTER_COLS = 7;
const LETTER_ROWS = 7;

const toGridIndex = (row, col, cols) => row * cols + col;

const buildTextFrame = ({ text, cols, rows, letterGap, align }) => {
  const frames = getFramesFromText(text);
  const letterCount = frames.length;

  if (letterCount === 0) {
    return [];
  }

  const totalWidth = letterCount * LETTER_COLS + (letterCount - 1) * letterGap;

  const maxLeft = Math.max(0, cols - totalWidth);
  const startCol =
    align === "right"
      ? maxLeft
      : align === "left"
        ? 0
        : Math.floor(maxLeft / 2);

  const startRow = Math.max(0, Math.floor((rows - LETTER_ROWS) / 2));

  const indices = new Set();

  frames.forEach((frame, charIndex) => {
    const charOffset = startCol + charIndex * (LETTER_COLS + letterGap);

    frame.forEach((index) => {
      const row = Math.floor(index / LETTER_COLS);
      const col = index % LETTER_COLS;
      const targetRow = startRow + row;
      const targetCol = charOffset + col;

      if (targetRow < rows && targetCol < cols) {
        indices.add(toGridIndex(targetRow, targetCol, cols));
      }
    });
  });

  return Array.from(indices);
};

const buildScrollFrames = ({ text, cols, rows, letterGap }) => {
  const frames = getFramesFromText(text);
  const letterCount = frames.length;

  if (letterCount === 0) {
    return [];
  }

  const totalWidth = letterCount * LETTER_COLS + (letterCount - 1) * letterGap;
  const startRow = Math.max(0, Math.floor((rows - LETTER_ROWS) / 2));

  const textIndices = [];
  frames.forEach((frame, charIndex) => {
    const charOffset = charIndex * (LETTER_COLS + letterGap);
    frame.forEach((index) => {
      const row = Math.floor(index / LETTER_COLS);
      const col = index % LETTER_COLS;
      textIndices.push({ row, col: charOffset + col });
    });
  });

  const sequence = [];
  for (let offset = cols; offset >= -totalWidth; offset -= 1) {
    const indices = [];
    textIndices.forEach(({ row, col }) => {
      const targetRow = startRow + row;
      const targetCol = offset + col;
      if (
        targetRow >= 0 &&
        targetRow < rows &&
        targetCol >= 0 &&
        targetCol < cols
      ) {
        indices.push(toGridIndex(targetRow, targetCol, cols));
      }
    });
    sequence.push(indices);
  }

  return sequence;
};

export { toGridIndex, buildTextFrame, buildScrollFrames };