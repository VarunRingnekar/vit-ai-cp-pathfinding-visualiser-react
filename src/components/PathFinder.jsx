import React, {useEffect, useState} from "react";
import Grid from "./Grid";

function PathFinder() {

    const START_NODE_ROW = 10;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    const [spots, setSpots] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    function newSpot(i, j) {
        return {
            row: i,
            col: j,
            isStart: i === START_NODE_ROW && j === START_NODE_COL,
            isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
            isWall: false,
            previousNode: null,
            parent: null,
            neighbors: [],
            fScore: 0,
            gScore: 0,
            hScore: 0
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        const tempGrid = [];
        for (let i = 0; i < windowSize.height / 25 - 2; i++) {
            const currentRow = [];
            for (let j = 0; j < windowSize.width / 25 - 2; j++) {
                currentRow.push(newSpot(i, j));
            }
            tempGrid.push(currentRow);
        }
        setSpots(JSON.parse(JSON.stringify(tempGrid)));
        console.log(spots);

        return () => window.removeEventListener("resize", handleResize);
    }, [spots, windowSize.height, windowSize.width])


    return (
        <Grid array={spots}/>
    );
}

export default PathFinder;