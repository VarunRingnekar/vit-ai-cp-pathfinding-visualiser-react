export function aStar(grid, start, goal) {
    const openList = [];
    const closedList = [];
    openList.push(start);
    while (openList.length > 0) {
        sortOpenList();
        let current = openList.shift();
        if (current === goal) {
            break;
        }
        findNeighbours(current);
        // console.log(current);
        closedList.push(current);
        for (const neighbour of current.neighbors) {
            if (!neighbour.isWall && !closedList.includes(neighbour)) {
                const tempG = current.gScore + 1;
                if (openList.includes(neighbour)) {
                    if (tempG < neighbour.gScore) {
                        neighbour.gScore = tempG;
                    }
                } else {
                    neighbour.gScore = tempG;
                    openList.push(neighbour);
                }
                neighbour.fScore = neighbour.gScore + neighbour.hScore;
                neighbour.parent = current;
            }
        }
        // console.log(openList.slice());
    }

    function sortOpenList() {
        openList.sort((spotA, spotB) => spotA.fScore - spotB.fScore);
    }

    function findNeighbours(spot) {
        spot.neighbors = [];
        const {row, col} = spot;
        if (row > 0) spot.neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) spot.neighbors.push(grid[row + 1][col]);
        if (col > 0) spot.neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) spot.neighbors.push(grid[row][col + 1]);
    }

    return closedList;
}

function removeFromArray(array, element) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === element) {
            array.splice(i, 1);
        }
    }
}

export function getPath(spot) {
    const path = [];
    while (spot.parent != null) {
        path.push(spot);
        spot = spot.parent;
    }
    return path;
}