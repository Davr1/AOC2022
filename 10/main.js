const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let cpuLog = {x: []};
let registers = {x: 1};

data.split("\n").forEach(instruction => {
    let [inst, value] = instruction.split(" ");
    switch(inst) {
        case "addx":
            cpuLog.x.push(registers.x);
            cpuLog.x.push(registers.x);
            registers.x += +value;
            break;
        case "noop":
        default:
            cpuLog.x.push(registers.x);
    }
})

// Part 1
let signalStrength = 0;
[20, 60, 100, 140, 180, 220].forEach(c => signalStrength += cpuLog.x[c-1] * c)

console.log(signalStrength);

// Part 2
let screen = ["", "", "", "", "", ""];

for (let i = 0; i < 40 * 6; i++) {
    let pixel = ".";
    if (cpuLog.x[i] + 1 >= i % 40 && cpuLog.x[i] - 1 <= i % 40) pixel = "#";
    
    screen[Math.floor(i / 40)] += pixel;
}

console.log(screen.join("\n"));