const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let values = data.split("\n").map((v, i) => [+v, i]);

let mod = (number, m) => ((number % m) + m) % m;

function moveArrayItem(array, from, amount) {
    let to = mod(from + amount - 1, array.length - 1) + 1;
    if (from === to % (array.length - 1)) return array;
    let tempArr = [...array.slice(0, from), ...array.slice(from + 1)];
    return [...tempArr.slice(0, to), array[from], ...tempArr.slice(to)];
}

function decryption(values) {
    for (let i = 0; i < values.length; i++) {
        let index = values.findIndex(a => a[1] === i);

        values = moveArrayItem(values, index, values[index][0]);
    }
    return values;
}

function groveCoordinats(values, origin, offsets) {
    return offsets.map(o => values[(origin + o) % values.length][0]).reduce((a, b) => a+b, 0);
}

// Part 1
let output1 = decryption(values);

let origin1 = output1.findIndex(a => a[0] === 0);
console.log(groveCoordinats(output1, origin1, [1000, 2000, 3000]));

// Part 2
let output2 = values.map(([v, i]) => [v * 811589153, i]);

for (let i = 0; i < 10; i++) {
    output2 = decryption(output2);
}

let origin2 = output2.findIndex(a => a[0] === 0);
console.log(groveCoordinats(output2, origin2, [1000, 2000, 3000]));