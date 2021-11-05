import React from "react";

function Spot(props) {
    const {
        row,
        col,
        isFinish,
        isStart,
        isVisited,
        isWall,
        isPath,
        onMouseDown,
        onMouseUp,
        onMouseEnter
    } = props;

    const extraClassName = isFinish
        ? 'spot-finish'
        : isStart
            ? 'spot-start'
            : isWall
                ? 'spot-wall'
                : isVisited
                    ? 'spot-visited'
                    : isPath
                        ? 'spot-path'
                        : '';
    return (
        <div
            id={`node-${row}-${col}`}
            className={`spot ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp(row, col)}
        />
    );
}

export default Spot