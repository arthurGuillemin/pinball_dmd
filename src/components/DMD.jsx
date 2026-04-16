import { DotMatrix } from 'dot-anime-react'
import DotMatrixDisplay from './DotMatrixDisplay'
import useBorderSequences from '../hooks/useBorderSequences'
import useDmdGridConfig from '../hooks/useDmdGridConfig'
import useDmdModes from '../hooks/useDmdModes'
import useDmdScreenSize from '../hooks/useDmdScreenSize'
import useFireworksSequence from '../hooks/useFireworksSequence'
import useSnakeFrames from '../hooks/useSnakeFrames'
import { DOT_SEQUENCES } from '../data/dotSequences'

const GRID_COLS = 40
const GRID_ROWS = 22
const GRID_GAP = 1
const DOT_COLOR = '#ffdc84'
const BACKGROUND_DOT_COLOR = 'rgba(253, 230, 124, 0.23)'
const SNAKE_TAIL_MIN_OPACITY = 0.2
const SNAKE_LENGTH = 10
const SNAKE_INTERVAL = 80
const FIREWORK_GRID = 7

function DMD({
    text = 'GAME OVER',
    sequence,
    config,
    className,
    letterGap = 0,
    scroll = true,
    borderBlink,
    borderSnake,
}) {
    const { screenRef, screenSize } = useDmdScreenSize()
    const activeColor = config?.color ?? DOT_COLOR
    const { backgroundConfig, textConfig, borderConfig, fireworksConfig, snakeConfigs } = useDmdGridConfig({
        screenSize,
        cols: GRID_COLS,
        rows: GRID_ROWS,
        gap: GRID_GAP,
        activeColor,
        backgroundDotColor: BACKGROUND_DOT_COLOR,
        config,
        snakeLength: SNAKE_LENGTH,
        snakeTailMinOpacity: SNAKE_TAIL_MIN_OPACITY,
    })

    const { borderSequence, scoreFrameSequence, gameOverBorderSequence, borderPath } = useBorderSequences({ cols: GRID_COLS, rows: GRID_ROWS })

    const fireworksSequence = useFireworksSequence({
        dotSequences: DOT_SEQUENCES,
        gridCols: GRID_COLS,
        gridRows: GRID_ROWS,
        fireworksGrid: FIREWORK_GRID,
    })

    const { isJackpot, isScore, isGameOver, shouldBlink, shouldSnake } =
        useDmdModes({ text, borderBlink, borderSnake })

    const showFireworks = isJackpot

    const { snakeFrames } = useSnakeFrames({
        shouldSnake,
        borderPath,
        snakeLength: SNAKE_LENGTH,
        interval: SNAKE_INTERVAL,
    })

    const shellClassName = [
        'dmd-shell',
        className || '',
        isJackpot ? 'dmd-jackpot' : '',
    ]
        .join(' ')
        .trim()

    return (
        <section className={shellClassName}>
            <div className="dmd-screen" ref={screenRef}>
                <div className="dmd-grid">
                    <div className="dmd-layer">
                        <DotMatrix sequence={[[]]} {...backgroundConfig} />
                    </div>
                </div>
                {isScore ? (
                    <div className="dmd-grid">
                        <div className="dmd-layer">
                            <DotMatrix
                                sequence={scoreFrameSequence}
                                {...borderConfig}
                            />
                        </div>
                    </div>
                ) : null}
                {showFireworks ? (
                    <div className="dmd-grid dmd-fireworks">
                        <div className="dmd-layer">
                            <DotMatrix
                                sequence={fireworksSequence}
                                {...fireworksConfig}
                            />
                        </div>
                    </div>
                ) : null}
                {isGameOver ? (
                    <div className="dmd-grid">
                        <div className="dmd-layer">
                            <DotMatrix
                                sequence={gameOverBorderSequence}
                                {...borderConfig}
                            />
                        </div>
                    </div>
                ) : null}
                {shouldSnake ? (
                    <div className="dmd-grid">
                        {snakeFrames.map((frame, index) => (
                            <div className="dmd-layer" key={`snake-${index}`}>
                                <DotMatrix
                                    sequence={[frame]}
                                    {...snakeConfigs[index]}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
                {isJackpot ? (
                    <div className="dmd-grid">
                        <div className="dmd-layer">
                            <DotMatrix
                                sequence={borderSequence}
                                {...borderConfig}
                            />
                        </div>
                    </div>
                ) : null}
                {!isJackpot && !shouldSnake && shouldBlink ? (
                    <div className="dmd-grid">
                        <div className="dmd-layer">
                            <DotMatrix
                                sequence={borderSequence}
                                {...borderConfig}
                            />
                        </div>
                    </div>
                ) : null}
                <div className="dmd-content">
                    <DotMatrixDisplay
                        text={text}
                        sequence={sequence}
                        config={textConfig}
                        letterGap={letterGap}
                        align="center"
                        scroll={scroll}
                    />
                </div>
            </div>
        </section>
    )
}

export default DMD
