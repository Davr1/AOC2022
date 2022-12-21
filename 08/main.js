const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let forest = data.split("\n").map(line => line.split("").map(n => +n));

let isHighest = (array, number) => number > Math.max(...array);

function gridLines(grid, x, y) {
    let top = [], bottom = [], left = [], right = [];

    for (let y2 = 0; y2 < grid.length; y2++) {
        if (y > y2) top.push(grid[y2][x]);
        if (y < y2) bottom.push(grid[y2][x]);
    }

    for (let x2 = 0; x2 < grid[0].length; x2++) {
        if (x > x2) left.push(grid[y][x2]);
        if (x < x2) right.push(grid[y][x2]);
    }

    return [top.reverse(), bottom, left.reverse(), right]
}

// if a tree is higher than all other trees in one of the four gridlines, then it must be visible
let isVisible = (grid, x, y) => gridLines(grid, x, y).some(arr => isHighest(arr, grid[y][x]));

function scenicScore(grid, x, y) {
    return gridLines(grid, x, y).map(line => {
        // finds the closest tree that is the same height or higher
        let highestVisibleTree = line.findIndex(v => v >= grid[y][x]);
        return highestVisibleTree === -1 ? line.length : highestVisibleTree + 1;
    }).reduce((a, b) => a * b, 1);
}

// Part 1
let visibleTrees = 0;

for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
        if (isVisible(forest, x, y)) visibleTrees++;
    }
}

console.log(visibleTrees);

// Part 2
let scenicScores = [];

for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
        scenicScores.push(scenicScore(forest, x, y));
    }
}

console.log(scenicScores.sort((a, b) => b - a)[0]);