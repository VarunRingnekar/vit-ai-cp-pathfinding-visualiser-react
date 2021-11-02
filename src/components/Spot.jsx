import React from "react";

function Spot(props) {
    const {
        row,
        col,
        isFinish,
        isStart,
        isWall,
    } = props;

    const extraClassName = isFinish
        ? 'spot-finish'
        : isStart
            ? 'spot-start'
            : isWall
                ? 'spot-wall'
                : '';
    return (
        <div
            id={`node-${row}-${col}`}
            className={`spot ${extraClassName}`}
        />
    );
}

export default Spot