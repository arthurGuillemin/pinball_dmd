import { useMemo } from "react";
import { DotMatrix } from "dot-anime-react";
import { buildTextFrame, buildScrollFrames } from "./dotMatrixUtils";

const DEFAULT_CONFIG = {
  cols: 40,
  rows: 22,
  dotSize: 8,
  gap: 2,
  interval: 120,
  shape: "circle",
  color: "#E6BB4D",
  inactiveColor: "transparent",
};

function DotMatrixText({
  text,
  sequence,
  config,
  className,
  letterGap = 1,
  align = "center",
  scroll = false,
}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const activeSequence = useMemo(() => {
    if (Array.isArray(sequence) && sequence.length > 0) {
      return sequence;
    }
    if (typeof text === "string") {
      if (scroll) {
        return buildScrollFrames({
          text,
          cols: mergedConfig.cols,
          rows: mergedConfig.rows,
          letterGap,
        });
      }

      const frame = buildTextFrame({
        text,
        cols: mergedConfig.cols,
        rows: mergedConfig.rows,
        letterGap,
        align,
      });
      return frame.length > 0 ? [frame] : [];
    }
    return [];
  }, [
    sequence,
    text,
    mergedConfig.cols,
    mergedConfig.rows,
    letterGap,
    align,
    scroll,
  ]);

  return (
    <DotMatrix
      sequence={activeSequence}
      className={className}
      {...mergedConfig}
    />
  );
}

export default DotMatrixText;