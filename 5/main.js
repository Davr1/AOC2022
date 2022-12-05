const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let crates = Array.from(Array(9), _ => new Array()); // nested array of length 9
data.split("\n")
    .slice(0, 8)
    .reverse()
    .forEach(crate_row => {
        [...crate_row.matchAll(/(?:\[(.)\]|\s{3})\s?/g)].forEach((match, i) => {
            if (match[1]) crates[i].push(match[1]); // non-empty crates are added to the correct column
        });
    });

let steps = data.split("\n")
    .slice(10)
    .map(step => {
        let values = step.match(/move (\d+) from (\d+) to (\d+)/);
        return {amount: +values[1], from: +values[2], to: +values[3]};
    });

// Part 1
let crateMover9k = structuredClone(crates);

for (let step of steps) {
    for (let i = step.amount; i > 0; i--) {
        crateMover9k[step.to-1].push(crateMover9k[step.from-1].pop());
    }
}

let upperCrates9k = crateMover9k.map(stack => stack.reverse()[0]).join("");

console.log(upperCrates9k);

// Part 2
let crateMover9k1 = structuredClone(crates);

for (let step of steps) {
    let removedCrates = crateMover9k1[step.from-1].splice(-step.amount);
    crateMover9k1[step.to-1].push(...removedCrates);
}

let upperCrates9k1 = crateMover9k1.map(stack => stack.reverse()[0]).join("");

console.log(upperCrates9k1);