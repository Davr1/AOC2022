const fs = require("fs");

const data = fs.readFileSync("./input", (err, data) => data).toString();

let commands = data.split("\n");

let fileStructure = {"/":{}};
let path = ["/"];

let folderSizes = [];

function getDir(path, parentDir) {
    return (path.length > 1) ? getDir(path.slice(1), parentDir[path[0]]) : parentDir;
}

function getSize(object) {
    let output = {};
    for (let property in object) {
        if (typeof(object[property]) === "object") {
            output[property] = getSize(object[property]);
            folderSizes.push(output[property]);
        } else {
            output[property] = object[property];
        }
    }
    return Object.values(output).reduce((a, b) => a + b, 0);
}

for (let i = 0; i < commands.length; i++) {
    let command = commands[i];

    if (command[0] === "$") {
        let args = command.slice(2).split(" ");

        if (args[0] === "cd") {
            if (args[1] === "..") path.pop();
            else if (args[1] === "/") path = ["/"];
            else {
                path.push(args[1]);
                getDir(path, fileStructure)[args[1]] = {};
            }
        } else if (args[0] === "ls") {
            while (commands[i+1] && commands[i+1][0] !== "$") {
                let [size, name] = commands[++i].split(" ");

                if (!isNaN(+size)) {
                    getDir(path, fileStructure)[path[path.length-1]][name] = +size;
                }
            }
        }
    }
}

let usedSpace = getSize(fileStructure);

// Part 1
console.log(folderSizes.filter(a => a < 100_000).reduce((a, b) => a + b, 0));

// Part 2
console.log(Math.min(...folderSizes.filter(a => a > 30_000_000 - (70_000_000 - usedSpace))));