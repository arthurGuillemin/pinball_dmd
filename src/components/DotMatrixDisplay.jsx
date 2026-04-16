import { useMemo } from 'react'
import { DotMatrix } from 'dot-anime-react'
import { getFramesFromText } from '../data/dotSequences'

const DEFAULT_CONFIG = {
    cols: 40,
    rows: 22,
    dotSize: 8,
    gap: 2,
    interval: 120,
    shape: 'circle',
    color: '#E6BB4D',
    inactiveColor: 'transparent',
}

const LETTER_COLS = 7
const LETTER_ROWS = 7

const toGridIndex = (row, col, cols) => row * cols + col

const buildTextFrame = ({ text, cols, rows, letterGap, align }) => {
    const frames = getFramesFromText(text)
    const letterCount = frames.length

    if (letterCount === 0) {
        return []
    }

    const totalWidth =
        letterCount * LETTER_COLS + (letterCount - 1) * letterGap

    const maxLeft = Math.max(0, cols - totalWidth)
    const startCol =
        align === 'right'
            ? maxLeft
            : align === 'left'
                ? 0
                : Math.floor(maxLeft / 2)

    const startRow = Math.max(0, Math.floor((rows - LETTER_ROWS) / 2))

    const indices = new Set()

    frames.forEach((frame, charIndex) => {
        const charOffset = startCol + charIndex * (LETTER_COLS + letterGap)

        frame.forEach((index) => {
            const row = Math.floor(index / LETTER_COLS)
            const col = index % LETTER_COLS
            const targetRow = startRow + row
            const targetCol = charOffset + col

            if (targetRow < rows && targetCol < cols) {
                indices.add(toGridIndex(targetRow, targetCol, cols))
            }
        })
    })

    return Array.from(indices)
}

const buildScrollFrames = ({ text, cols, rows, letterGap }) => {
    const frames = getFramesFromText(text)
    const letterCount = frames.length

    if (letterCount === 0) {
        return []
    }

    const totalWidth = letterCount * LETTER_COLS + (letterCount - 1) * letterGap
    const startRow = Math.max(0, Math.floor((rows - LETTER_ROWS) / 2))

    const textIndices = []
    frames.forEach((frame, charIndex) => {
        const charOffset = charIndex * (LETTER_COLS + letterGap)
        frame.forEach((index) => {
            const row = Math.floor(index / LETTER_COLS)
            const col = index % LETTER_COLS
            textIndices.push({ row, col: charOffset + col })
        })
    })

    const sequence = []
    for (let offset = cols; offset >= -totalWidth; offset -= 1) {
        const indices = []
        textIndices.forEach(({ row, col }) => {
            const targetRow = startRow + row
            const targetCol = offset + col
            if ( targetRow >= 0 && targetRow < rows && targetCol >= 0 && targetCol < cols) {
                indices.push(toGridIndex(targetRow, targetCol, cols))
            }
        })
        sequence.push(indices)
    }

    return sequence
}

function DotMatrixDisplay({ text, sequence, config, className, letterGap = 1, align = 'center', scroll = false }) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config }

    const activeSequence = useMemo(() => {
        if (Array.isArray(sequence) && sequence.length > 0) {
            return sequence
        }
        if (typeof text === 'string') {
            if (scroll) {
                return buildScrollFrames({ text, cols: mergedConfig.cols, rows: mergedConfig.rows, letterGap })
            }

            const frame = buildTextFrame({ text, cols: mergedConfig.cols, rows: mergedConfig.rows, letterGap, align })
            return frame.length > 0 ? [frame] : []
        }
        return []
    },
    [ sequence, text, mergedConfig.cols, mergedConfig.rows, letterGap, align, scroll ])

    return (
        <DotMatrix
            sequence={activeSequence}
            className={className}
            {...mergedConfig}
        />
    )
}

export default DotMatrixDisplay
