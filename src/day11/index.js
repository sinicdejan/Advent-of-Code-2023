import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

let emptyRows;
let emptyColumns;
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let universe = input.split('\n').map((line) => line.split(''));

  let counter = 1;

  emptyRows = [];
  emptyColumns = [];
  let galaxyCoordinates = [];

  for(let i = 0; i < universe.length; i++) {
    let noGalaxies = true;
    for(let j = 0; j < universe[0].length; j++) {
      if(universe[i][j] === '#') {
        galaxyCoordinates.push([i, j]);
        universe[i][j] = counter;
        counter++;
        noGalaxies = false;
      }
    }
    if(noGalaxies) emptyRows.push(i);
  }

  for(let j = 0; j < universe[0].length; j++) {
    let noGalaxies = true;
    for(let i = 0; i < universe.length; i++) {
      if(universe[i][j] !== '.') {
        noGalaxies = false;
      }
    }
    if(noGalaxies) emptyColumns.push(j);
  }

  let distance = 0;

  for(let i = 0; i < galaxyCoordinates.length; i++) {
    for(let j = 1; j+i < galaxyCoordinates.length; j++) {
      distance += calculateDistance(galaxyCoordinates[i], galaxyCoordinates[i+j]);
    }
  }

  return distance;
};

function calculateDistance(pointA, pointB, voidDistance) {
  let distance = Math.abs(pointA[0]-pointB[0]) + Math.abs(pointA[1]-pointB[1]);
  for(let i = 0; i < emptyRows.length; i++) {
    if(pointA[0] < emptyRows[i] && pointB[0] > emptyRows[i]) distance += voidDistance;
    else if(pointA[0] > emptyRows[i] && pointB[0] < emptyRows[i]) distance += voidDistance;
  }

  for(let i = 0; i < emptyColumns.length; i++) {
    if(pointA[1] < emptyColumns[i] && pointB[1] > emptyColumns[i]) distance += voidDistance;
    else if(pointA[1] > emptyColumns[i] && pointB[1] < emptyColumns[i]) distance += 1;
  }
  return distance;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let universe = input.split('\n').map((line) => line.split(''));

  let counter = 1;

  emptyRows = [];
  emptyColumns = [];
  let galaxyCoordinates = [];

  for(let i = 0; i < universe.length; i++) {
    let noGalaxies = true;
    for(let j = 0; j < universe[0].length; j++) {
      if(universe[i][j] === '#') {
        galaxyCoordinates.push([i, j]);
        universe[i][j] = counter;
        counter++;
        noGalaxies = false;
      }
    }
    if(noGalaxies) emptyRows.push(i);
  }

  for(let j = 0; j < universe[0].length; j++) {
    let noGalaxies = true;
    for(let i = 0; i < universe.length; i++) {
      if(universe[i][j] !== '.') {
        noGalaxies = false;
      }
    }
    if(noGalaxies) emptyColumns.push(j);
  }

  let distance = 0;

  for(let i = 0; i < galaxyCoordinates.length; i++) {
    for(let j = 1; j+i < galaxyCoordinates.length; j++) {
      distance += calculateDistance(galaxyCoordinates[i], galaxyCoordinates[i+j], 1000000);
    }
  }

  return distance;
};

function calculateDistance(pointA, pointB, voidDistance) {
  if(voidDistance > 1) voidDistance -= 1;
  let distance = Math.abs(pointA[0]-pointB[0]) + Math.abs(pointA[1]-pointB[1]);
  for(let i = 0; i < emptyRows.length; i++) {
    if(pointA[0] < emptyRows[i] && pointB[0] > emptyRows[i]) distance += voidDistance;
    else if(pointA[0] > emptyRows[i] && pointB[0] < emptyRows[i]) distance += voidDistance;
  }

  for(let i = 0; i < emptyColumns.length; i++) {
    if(pointA[1] < emptyColumns[i] && pointB[1] > emptyColumns[i]) distance += voidDistance;
    else if(pointA[1] > emptyColumns[i] && pointB[1] < emptyColumns[i]) distance += voidDistance;
  }
  return distance;
}

run({
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 8410,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});