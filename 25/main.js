const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let snafuLookup = new Map([["=", -2], ["-", -1], ["0", 0], ["1", 1], ["2", 2]]);
let snafuNumerals = [...snafuLookup.keys()];

function intToSnafu(n) {
    let output = [];
    while (n) {
        output.push(snafuNumerals[(n + 2) % 5]);
        n = Math.floor((n + 2) / 5);
    }
    return output.reverse().join("");
}

function snafuToInt(s) {
    return s.split("").reverse()
    .map((v, i) => 
        snafuLookup.get(v) * Math.pow(5, i)
    )
    .reduce((a, b) => a + b, 0);
}

// Part 1
let sum = data.split("\n").map(s => snafuToInt(s)).reduce((a, b) => a + b, 0);

console.log(intToSnafu(sum));