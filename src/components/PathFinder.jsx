import React, {useEffect, useState} from "react";
import Grid from "./Grid";
import {aStar} from "../algorithms/a-star";
import {bestFirstSearch, getPath} from "../algorithms/best-first-search";
import {djikstra} from "../algorithms/djikstra";

function PathFinder() {

    const START_NODE_ROW = 2;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 15;
    const FINISH_NODE_COL = 35;


    const [spots, setSpots] = useState([]);
    const [mouseIsPressed, setMousePress] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    function newSpot(i, j, hScore) {
        return {
            row: i,
            col: j,
            isStart: i === START_NODE_ROW && j === START_NODE_COL,
            isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
            isWall: false,
            isPath: false,
            previousNode: null,
            parent: null,
            neighbors: [],
            fScore: 0,
            gScore: 0,
            hScore: hScore,
            isVisited: false
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
        console.log("resized")
        for (let i = 0; i < windowSize.height / 25 - 2; i++) {
            const currentRow = [];
            for (let j = 0; j < windowSize.width / 25 - 2; j++) {
                const hScore = Math.abs(i - FINISH_NODE_ROW) + Math.abs(j - FINISH_NODE_COL);
                currentRow.push(newSpot(i, j, hScore));
            }
            tempGrid.push(currentRow);
        }

        setSpots(JSON.parse(JSON.stringify(tempGrid)));

        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize.height, windowSize.width])

    function visualiseAStar() {
        const visitedNodesInOrder = aStar(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        // console.log(visitedNodesInOrder);
        const path = getPath(spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        console.log(path);
        animate(visitedNodesInOrder, path);
    }
    function visualiseBestFirstSearch() {
        const visitedNodesInOrder = bestFirstSearch(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        // console.log(visitedNodesInOrder);
        const path = getPath(spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        console.log(path);
        animate(visitedNodesInOrder, path);
    }

    function visualiseDjikstra() {
        const visitedNodesInOrder = djikstra(spots, spots[START_NODE_ROW][START_NODE_COL], spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        // console.log(visitedNodesInOrder);
        const path = getPath(spots[FINISH_NODE_ROW][FINISH_NODE_COL]);
        console.log(path);
        animate(visitedNodesInOrder, path);
    }

    function animate(visitedNodes, path) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animatePath(path);
                }, 10 * i);
            } else {
                setTimeout(() => {
                    const node = visitedNodes[i];
                    const newGrid = spots.slice();
                    newGrid[node.row][node.col] = {
                        ...node,
                        isVisited: true
                    };
                    setSpots(newGrid);
                }, 10 * i);
            }
        }
    }

    function clearPath(){
        const newGrid = spots.slice();
        Array.from(newGrid).forEach(row => {
            Array.from(row).forEach(spot=>{
                spot.isVisited = false;
                spot.isPath = false;
            })
        });
        setSpots(newGrid);
    }

    function animatePath(path) {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                const newGrid = spots.slice();
                newGrid[node.row][node.col] = {
                    ...node,
                    isPath: true
                };
                setSpots(newGrid);
            }, 50 * i);
        }

    }

    function handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(spots, row, col);
        setSpots(newGrid);
        setMousePress(true);
    }

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(spots, row, col);
        setSpots(newGrid);
    }

    function handleMouseUp() {
        setMousePress(false);
    }

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        newGrid[row][col] = {
            ...node,
            isWall: !node.isWall,
        };
        return newGrid;
    };

    return (
        <>
            <button onClick={clearPath}>
                Clear Path
            </button>
            <button onClick={visualiseAStar}>
                Visualise a-star
            </button>
            <button onClick={visualiseBestFirstSearch}>
                Visualise best-first-search
            </button>
            <button onClick={visualiseDjikstra}>
                Visualise djikstra
            </button>
            <Grid array={spots} mouseIsPressed={mouseIsPressed} onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter} onMouseUp={handleMouseUp}/>
        </>

    );
}

export default PathFinder;