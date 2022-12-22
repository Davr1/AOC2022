const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let monkeys = Object.fromEntries(data.split("\n").map(m => m.split(": ")).map(m => [m[0], (+m[1] || m[1].split(" "))]));

function getMonkeyValue(monkeyRef) {
    let value = monkeys[monkeyRef];
    if (typeof value === "number") return value;

    switch (value[1]) {
        case "+":
            return getMonkeyValue(value[0]) + getMonkeyValue(value[2]);
        case "-":
            return getMonkeyValue(value[0]) - getMonkeyValue(value[2]);
        case "*":
            return getMonkeyValue(value[0]) * getMonkeyValue(value[2]);
        case "/":
            return getMonkeyValue(value[0]) / getMonkeyValue(value[2]);
    }
}

function findMonkey(out, fromMonkey, toMonkey) {
    if (fromMonkey === toMonkey) return true;
    let value = monkeys[fromMonkey];
    if (typeof value === "number") return false;

    if (findMonkey(out, value[0], toMonkey) || findMonkey(out, value[2], toMonkey)) {
        out.push(fromMonkey);
        return true;
    }
}

function getMonkeyValueInv(monkeyRef) {
    let finalNumber;
    let path = [];
    findMonkey(path, "root", monkeyRef);
    path.reverse();

    for (let m of path) {
        let [m1, op, m2] = monkeys[m];
        let value, monkeyToCheck;

        if (path.includes(m1) || m1 === "humn") {
            value = getMonkeyValue(m2);
            monkeyToCheck = m1;
        } else {
            value = getMonkeyValue(m1);
            monkeyToCheck = m2;
        }

        if (m === "root") {
            finalNumber = value;
            continue;
        }

        switch (op) {
            case "+":
                finalNumber -= value;
                break;
            case "-":
                finalNumber = (monkeyToCheck === m1) ? finalNumber + value : value - finalNumber;
                break;
            case "*":
                finalNumber /= value;
                break;
            case "/":
                finalNumber = (monkeyToCheck === m1) ? finalNumber * value : value / finalNumber;
                break;
        }
    }
    return finalNumber;
}

// Part 1
console.log(getMonkeyValue("root"));

// Part 2
console.log(getMonkeyValueInv("humn"));