import { useMemo } from "react";
import { buildBorderBlinkSequence, buildBorderPath, buildBorderFrameSequence, buildHorizontalBorderSequence } from "../helpers/dmdBorderEffects";

function useBorderSequences({ cols, rows }) {
  const borderSequence = useMemo(
    () => buildBorderBlinkSequence(cols, rows),
    [cols, rows],
  );

  const scoreFrameSequence = useMemo(
    () => buildBorderFrameSequence(cols, rows, 2, true),
    [cols, rows],
  );

  const gameOverBorderSequence = useMemo(
    () => buildHorizontalBorderSequence(cols, rows, 2, false),
    [cols, rows],
  );

  const borderPath = useMemo(() => buildBorderPath(cols, rows), [cols, rows]);

  return { borderSequence, scoreFrameSequence, gameOverBorderSequence, borderPath };
}

export default useBorderSequences;
