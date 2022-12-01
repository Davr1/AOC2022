const fs = require('fs');

const data = fs.readFileSync('./input', (err, data) => data).toString();

let elves = data.split("\n\n").map(elf => elf.split("\n").reduce((a, b) => a + parseInt(b), 0));

elves.sort((a, b) => b - a);

console.log(elves[0]);
console.log(elves.slice(0, 3).reduce((a, b) => a + b));