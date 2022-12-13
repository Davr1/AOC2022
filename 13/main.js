const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let packets = data.split("\n\n").map(pair => pair.split("\n").map(packet => eval(packet)));

function compareNumbers(a, b) {
    if (a === b) return 0;
    else if (a > b) return 1;
    else if (a < b) return -1;
}

function compare(left, right) {
    let comparison = 0;

    if (!Array.isArray(left) && !Array.isArray(right)) {
        comparison = compareNumbers(left, right);
    } else {
        if (!Array.isArray(left)) left = [left];
        if (!Array.isArray(right)) right = [right];

        let minLength = Math.min(left.length, right.length);

        for (let i = 0; i < minLength && comparison === 0; i++) {
            comparison = compare(left[i], right[i]);
        }

        comparison ||= compareNumbers(left.length, right.length);
    }

    return comparison;
}

// Part 1
let packetPairs = packets.map(p => compare(...p));
console.log(packetPairs.map((c, i) => c === -1 ? i+1 : 0).reduce((a, b) => a + b, 0));

// Part 2
let sortedPackets = [...packets.flat(), [[2]], [[6]]].sort(compare);
let dividerPacket1 = sortedPackets.findIndex(p => JSON.stringify(p) === "[[2]]") + 1;
let dividerPacket2 = sortedPackets.findIndex(p => JSON.stringify(p) === "[[6]]") + 1;

console.log(dividerPacket1 * dividerPacket2);