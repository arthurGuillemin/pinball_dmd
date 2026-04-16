import { useMemo } from "react";

function useDmdGridConfig({ screenSize, cols, rows, gap, activeColor, backgroundDotColor, config, borderInterval = 220, fireworksInterval = 140, snakeLength = 0, snakeTailMinOpacity = 0.2,
}) {
  const gridConfig = useMemo(() => {
    const usableWidth = Math.max(0, screenSize.width - gap * (cols - 1));
    const usableHeight = Math.max(0, screenSize.height - gap * (rows - 1));
    const dotSize = Math.max(
      1,
      Math.floor(Math.min(usableWidth / cols, usableHeight / rows)),
    );

    return { cols, rows, gap, dotSize };
  }, [screenSize.height, screenSize.width, cols, rows, gap]);

  const backgroundConfig = useMemo(
    () => ({
      ...gridConfig,
      shape: "circle",
      color: "#000000",
      inactiveColor: backgroundDotColor,
    }),
    [gridConfig, backgroundDotColor],
  );

  const textConfig = useMemo(
    () => ({
      ...gridConfig,
      inactiveColor: "transparent",
      ...config,
    }),
    [config, gridConfig],
  );

  const borderConfig = useMemo(
    () => ({ ...gridConfig, shape: "circle",
      color: activeColor,
      inactiveColor: "transparent",
      interval: borderInterval,
    }),
    [activeColor, gridConfig, borderInterval],
  );

  const fireworksConfig = useMemo(
    () => ({
      ...gridConfig,
      shape: "circle",
      color: activeColor,
      inactiveColor: "transparent",
      interval: fireworksInterval,
    }),
    [activeColor, gridConfig, fireworksInterval],
  );

  const snakeConfigs = useMemo(() => {
    if (!snakeLength) {
      return [];
    }

    return Array.from({ length: snakeLength }, (_, index) => {
      const progress = snakeLength <= 1 ? 0 : index / (snakeLength - 1);
      const opacity = 1 - progress * (1 - snakeTailMinOpacity);
      return {
        ...gridConfig,
        shape: "circle",
        color: activeColor,
        activeDotStyle: { opacity },
        inactiveColor: "transparent",
      };
    });
  }, [activeColor, gridConfig, snakeLength, snakeTailMinOpacity]);

  return { gridConfig, backgroundConfig, textConfig, borderConfig, fireworksConfig, snakeConfigs };
}

export default useDmdGridConfig;
