const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let lines = data.split("\n");

let map = [...Array(lines.length)].map(_ => []);
let unvisitedNodes = [];

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        let char = lines[i][j];
        let height = char.codePointAt(0) - 96;
        if (char === "S") height = 1;
        if (char === "E") height = -1;

        map[i].push(height);
        unvisitedNodes.push({x: j, y: i, distance: char === "S" ? 0 : Infinity});
    }
}

function getNeighbours(originalNode) {
    let neighbors = [
        unvisitedNodes.find(n => n.x === originalNode.x && n.y === originalNode.y-1),
        unvisitedNodes.find(n => n.x === originalNode.x-1 && n.y === originalNode.y),
        unvisitedNodes.find(n => n.x === originalNode.x && n.y === originalNode.y+1),
        unvisitedNodes.find(n => n.x === originalNode.x+1 && n.y === originalNode.y)
    ];
    return neighbors.filter(n => n);
}

let distanceMap = [...Array(map.length)].map(_ => Array(map[0].length));

while (unvisitedNodes.length !== 0) {
    let min = Math.min(...unvisitedNodes.map(n => n.distance));
    currentNode = unvisitedNodes.splice(unvisitedNodes.findIndex(n => n.distance === min), 1)[0];
    currentNodeHeight = map[currentNode.y][currentNode.x];

    getNeighbours(currentNode).forEach(node => {
        let nodeHeight = map[node.y][node.x];

        if (nodeHeight <= currentNodeHeight + 1) {
            node.distance = Math.min(node.distance, currentNode.distance + 1);
        }
    })

    distanceMap[currentNode.y][currentNode.x] = {height: currentNodeHeight, distance: currentNode.distance};
}

// Part 1
console.log(distanceMap.flat().find(node => node.height === -1).distance);