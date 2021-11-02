import React from "react";
import Spot from "./Spot";

function Grid(props) {
    return (
        <div className={'grid'}>
            {props.array.map(function (row, rowIdx) {
                return (
                    <div key={rowIdx} className={'grid-row'}>
                        {row.map(function (spot, spotIdx) {
                            const {row, col, isFinish, isStart, isWall} = spot;
                            return (
                                <Spot
                                    key={spotIdx}
                                    row={row}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Grid