const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

const rockFormations = [
    [[0, 0], [1, 0], [2, 0], [3, 0]], // -
    [[1, 0], [0, -1], [1, -1], [2, -1], [1, -2]], // +
    [[0, 0], [1, 0], [2, 0], [2, -1], [2, -2]], // L
    [[0, 0], [0, -1], [0, -2], [0, -3]], // I
    [[0, 0], [1, 0], [0, -1], [1, -1]] // o
];

const jetPattern = data.split("").map(char => ({"<": -1, ">": 1})[char]);

let transform = (points, x, y) => points.map(p => [p[0] + x, p[1] + y]);

function canMove(cave, rock) {
    return rock.every(p => {
        let inXRange = p[0] >= 0 && p[0] < cave[0].length;
        let inYRange = p[1] >= 0 && p[1] < cave.length;
        return inXRange && inYRange && cave[p[1]][p[0]] === 0;
    });
}

function startingPos(cave) {
    let index = cave.findIndex(line => line.includes(1));
    return (index === -1 ? cave.length : index) - 4;
}

let placeRock = (cave, rock) => rock.forEach(p => cave[p[1]][p[0]] = 1);

let cave = [...Array(5000)].map(_ => Array(7).fill(0));

let patternIndex = -1;
for (let rockCount = 0; rockCount < 2022; rockCount++) {
    let rock = transform(rockFormations[rockCount % 5], 2, startingPos(cave));
    while(true) {
        patternIndex = (patternIndex + 1) % jetPattern.length;

        let verticalTransform = transform(rock, jetPattern[patternIndex], 0);
        if (canMove(cave, verticalTransform)) {
            rock = verticalTransform;
        }

        let horizontalTransform = transform(rock, 0, 1);
        if (canMove(cave, horizontalTransform)) {
            rock = horizontalTransform;
        } else {
            break;
        }
    }
    placeRock(cave, rock);
}

// Part 1
console.log(cave.length - cave.findIndex(line => line.includes(1)));

// Part 2
// I have no idea