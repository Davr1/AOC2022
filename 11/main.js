const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let rawMonkeys = data.trim().split("\n\n").map(m => m.split("\n").slice(1));
let monkeys = [];

for (let monkeyData of rawMonkeys) {
    let [items, op, test, ifTrue, ifFalse] = monkeyData.map(m => m.split(":")[1].trim());

    monkeys.push({
        items: items.split(",").map(item => +item),
        op: op.split("=")[1],
        test: +test.match(/divisible by (\d+)/)[1],
        ifTrue: +ifTrue.match(/throw to monkey (\d+)/)[1],
        ifFalse: +ifFalse.match(/throw to monkey (\d+)/)[1],
        count: 0
    });
}

let lcm = monkeys.reduce((a, b) => a * b.test, 1); // all tests are already prime numbers

function simulateRound(monkeys, worried = false) {
    for (let monkey of monkeys) {
        while (monkey.items.length !== 0) {
            // "old" is used in the evaluated expression
            let old = monkey.items.shift();
            // one of the monkeys increases the worry levels exponentially, so we have to get the remainder first (part 2)
            let worryLevel = worried ? eval(monkey.op) % lcm : Math.floor(eval(monkey.op) / 3);

            if (worryLevel % monkey.test === 0) {
                monkeys[monkey.ifTrue].items.push(worryLevel);
            } else {
                monkeys[monkey.ifFalse].items.push(worryLevel);
            }

            monkey.count++;
        }
    }
}

// Part 1
let monkeys1 = structuredClone(monkeys);

for (let i = 0; i < 20; i++) simulateRound(monkeys1);
let monkeyBusiness1 = monkeys1.map(m => m.count).sort((a, b) => b - a);
console.log(monkeyBusiness1[0] * monkeyBusiness1[1]);

// Part 2
let monkeys2 = structuredClone(monkeys);

for (let i = 0; i < 10000; i++) simulateRound(monkeys2, true);
let monkeyBusiness2 = monkeys2.map(m => m.count).sort((a, b) => b - a);
console.log(monkeyBusiness2[0] * monkeyBusiness2[1]);