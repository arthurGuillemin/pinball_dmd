import { useMemo } from "react";
import { buildFireworksSequence } from "../helpers/dmdFireworks";

function useFireworksSequence({ dotSequences, gridCols, gridRows, fireworksGrid }) {
  return useMemo(
    () =>
      buildFireworksSequence({ dotSequences, gridCols, gridRows, fireworksGrid }),
    [dotSequences, gridCols, gridRows, fireworksGrid],
  );
}

export default useFireworksSequence;
