const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

// range of whole numbers from a to b (inclusive)
let incRange = (a, b) => [...Array(b - a + 1)].map((_, i) => i + a);

let pairs = data
    .split("\n")
    .map(pair => pair
        .split(",")
        .map(elf => incRange(...elf.split("-").map(n => +n)))
    );

// Part 1
let fullOverlaps = 0;

pairs.forEach(pair => {
    let unique = new Set([...pair[0], ...pair[1]]);
    if (unique.size === pair[0].length || unique.size === pair[1].length) {
        fullOverlaps++;
    }
});

console.log(fullOverlaps);

// Part 2
let partialOverlaps = 0;

pairs.forEach(pair => {
    if (pair[0].some(n => pair[1].includes(n))) {
        partialOverlaps++;
    }
});

console.log(partialOverlaps);