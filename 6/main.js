const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

function findMarker(text, mLength) {
    for (let i = 0; i < text.length; i++) {
        if ((new Set(text.substring(i, i+mLength))).size === mLength) return i+mLength;
    }
}

// Part 1
console.log(findMarker(data, 4));

// Part 2
console.log(findMarker(data, 14));