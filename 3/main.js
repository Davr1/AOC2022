const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let priorities = "";
for (let i = 0; i < 26; i++) priorities += String.fromCodePoint(i+97); // lowercase alphabet
for (let i = 0; i < 26; i++) priorities += String.fromCodePoint(i+65); // uppercase

let rucksacks = data.split("\n");

// Part 1
let prioritySum = 0;

for (let rucksack of rucksacks) {
    let length = rucksack.length;
    let c1 = new Set(rucksack.slice(0, length/2)); // converts the contents into a set, thus removing duplicates
    let c2 = new Set(rucksack.slice(length/2));

    c1.forEach(item => {
        if (Array.from(c2).includes(item)) {
            prioritySum += priorities.search(item) + 1;
        };
    });
}

console.log(prioritySum);

// Part 2
let badgePrioritySum = 0;

for (let i = 0; i < rucksacks.length / 3; i++) {
    let r1 = new Set(rucksacks[i*3 + 0]);
    let r2 = new Set(rucksacks[i*3 + 1]);
    let r3 = new Set(rucksacks[i*3 + 2]);

    r1.forEach(item => {
        if (Array.from(r2).includes(item) && Array.from(r3).includes(item)) {
            badgePrioritySum += priorities.search(item) + 1;
        }
    });
}

console.log(badgePrioritySum);