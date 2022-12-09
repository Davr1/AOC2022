const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let moves = data.split("\n").map(line => {
    let [direction, amount] = line.split(" ");
    return {direction, amount: +amount};
});

class Knot {
    x = 0;
    y = 0;
    updatePos = function(x, y) {
        this.x = x;
        this.y = y;
        this.visitedSquares.push(Symbol.for([this.x, this.y]));
    }

    visitedSquares = [Symbol.for([this.x, this.y])];
    get visitedSquaresCount() { return (new Set(this.visitedSquares)).size; }
}

function moveKnot(move, knot) {
    switch (move.direction) {
        case "L":
            knot.x--;
            break;
        case "R":
            knot.x++;
            break;
        case "U":
            knot.y--;
            break;
        case "D":
            knot.y++;
            break;
    }
}

function simulateRope(head, tail, move) {
    if (move) moveKnot(move, head);

    if (getDistance(head.x, head.y, tail.x, tail.y) < 2) return;

    let newX = tail.x, newY = tail.y;

    if (head.x > tail.x) newX++;
    if (head.x < tail.x) newX--;

    if (head.y > tail.y) newY++;
    if (head.y < tail.y) newY--;

    tail.updatePos(newX, newY);
}

let getDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

// Part 1
let head1 = new Knot;
let tail1 = new Knot;

for (let move of moves) {
    for (let i = 0; i < move.amount; i++) {
        simulateRope(head1, tail1, move);
    }
}

console.log(tail1.visitedSquaresCount);

// Part 2
let head2 = new Knot;
let tails = Array.from(Array(9), _ => new Knot);

for (let move of moves) {
    for (let i = 0; i < move.amount; i++) {
        simulateRope(head2, tails[0], move);
        for (let i = 0; i < tails.length - 1; i++) {
            simulateRope(tails[i], tails[i+1]);
        }
    }
}

console.log(tails[8].visitedSquaresCount);
