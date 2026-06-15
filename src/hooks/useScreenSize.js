import { useEffect, useRef, useState } from "react";

function useDmdScreenSize() {
  const screenRef = useRef(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!screenRef.current || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      setScreenSize({ width, height });
    });

    observer.observe(screenRef.current);

    return () => observer.disconnect();
  }, []);

  return { screenRef, screenSize };
}

export default useDmdScreenSize;
