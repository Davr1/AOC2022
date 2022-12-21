const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let opponent = [];
let you = [];

data.split("\n")
    .forEach(move => {
        let [a, b] = move.split(" ");
        opponent.push(a);
        you.push(b);
    });

// unsigned modulo, where (-2, -1, 0, 1, 2)%3 becomes (1, 2, 0, 1, 2)
mod = (number, m) => ((number % m) + m) % m; 

// Part 1
function convertRPC(letter) {
    switch(letter) {
        case "A":
        case "X":
            return 1; // rock
        case "B":
        case "Y":
            return 2; // paper
        case "C":
        case "Z":
            return 3; // scissors
    }
}

function matchAgainst(a /* opponent */, b /* you */) {
    switch (mod(b - a, 3)) {
        case 1:
            return 6; // win; your move is higher
        case 0:
            return 3; // draw; your move is the same as opponent's move
        default:
            return 0; // lose
    }
}

let score1 = 0;

for (let i = 0; i < opponent.length; i++) {
    score1 += convertRPC(you[i]);
    score1 += matchAgainst(convertRPC(opponent[i]), convertRPC(you[i]));
}

console.log(score1);

// Part 2
function convertLDW(letter) {
    switch (letter) {
        case "X":
            return -1; // lose
        case "Y":
            return 0; // draw
        case "Z":
            return 1; // win
    }
}

let score2 = 0;

for (let i = 0; i < opponent.length; i++) {
    let nextMove = mod(convertRPC(opponent[i]) + convertLDW(you[i]) - 1, 3) + 1;
    score2 += nextMove;
    score2 += (convertLDW(you[i]) + 1) * 3;
}

console.log(score2);