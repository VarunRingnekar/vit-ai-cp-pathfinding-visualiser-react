import React, {useContext} from "react";
import Spot from "./Spot";
import AppContext from "../context/app-context";
import {onMouseDown, onMouseEnter, onMouseUp} from "../algorithms/utility";

function Grid() {

    const { spots, setSpots, mouseIsPressed, setMousePress } = useContext(AppContext);
    // console.log("inside grid ", spots)

    return (
        <div className={'grid column right'}>
            {spots.map(function (row, rowIdx) {
                return (
                    <div key={rowIdx} className={'grid-row'}>
                        {row.map(function (spot, spotIdx) {
                            const {row, col, isFinish, isStart, isWall, isVisited, isPath} = spot;
                                    {/* console.log("in grid in loop ", spots) */}
                            return (
                                <Spot
                                    key={spotIdx}
                                    row={row}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    isVisited={isVisited}
                                    isPath={isPath}
                                    mouseIsPressed={mouseIsPressed}
                                    // onMouseEnter={(spots, setSpots, row, col, mouseIsPressed) => onMouseEnter(spots, setSpots, row, col, mouseIsPressed)}
                                    // onMouseDown={(spots, setSpots, row, col, setMousePress) => onMouseDown(spots, setSpots, row, col, setMousePress)}
                                    // onMouseUp={(row, col, setMousePress) => onMouseUp(row, col, setMousePress)}

                                    onMouseEnter={() => onMouseEnter(spots, setSpots, row, col, mouseIsPressed)}
                                    onMouseDown={() => onMouseDown(spots, setSpots, row, col, setMousePress)}
                                    onMouseUp={() => onMouseUp(setMousePress)}
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