const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

const types = { air: 0, rock: 1, sand: 2 };

let caveSlice = [...Array(200)].map(_ => Array(1000).fill(types.air));

let lowestY = 0;

data.split("\n").forEach(line => {
    let x, y;
    [...line.matchAll(/(\d+),(\d+)/g)].forEach(match => {
        let tempX = +match[1];
        let tempY = +match[2];

        if (x && y) {
            for (let i = Math.min(x, tempX); i < Math.max(x, tempX); i++) caveSlice[tempY][i] = types.rock;
            for (let i = Math.min(y, tempY); i < Math.max(y, tempY); i++) caveSlice[i][tempX] = types.rock;
        }

        [x, y] = [tempX, tempY];
        caveSlice[y][x] = types.rock;
        lowestY = Math.max(lowestY, y);
    })
})

function fallingSand(slice) {
    let count = 0;

    mainLoop:
    while (true) {
        let [x, y] = [500, 0];

        while (true) {
            if (y+1 >= slice.length-1) break mainLoop;
            if (slice[y][x] !== types.air) break mainLoop;

            if (slice[y+1][x] === types.air) {
                y++;
            } else if (slice[y+1][x-1] === types.air) {
                y++;
                x--;
            } else if (slice[y+1][x+1] === types.air) {
                y++;
                x++;
            } else {
                count++;
                break;
            }
        }

        slice[y][x] = types.sand;
    }

    return count;
}

// Part 1
let cave1 = structuredClone(caveSlice);
console.log(fallingSand(cave1));

// Part 2
let cave2 = structuredClone(caveSlice);
cave2[lowestY+2] = Array(1000).fill(types.rock);
console.log(fallingSand(cave2));