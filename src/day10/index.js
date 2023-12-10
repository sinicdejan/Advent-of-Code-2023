import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const pipeMap = input.split("\n").map((line) => line.split(""));
  let startX;
  let startY;

  for (let i = 0; i < pipeMap.length; i++) {
    for (let j = 0; j < pipeMap[0].length; j++) {
      if (pipeMap[i][j] === "S") {
        startX = i;
        startY = j;
      }
    }
  }

  let lastDirection = '';
  let positionX = startX;
  let positionY = startY;
  let steps = 0;

  let up = true;
  let right = true;
  let left = true;
  let down = true;

  do {
    if ( //up
      positionX - 1 >= 0 && lastDirection !== 'down' && up &&
      (pipeMap[positionX - 1][positionY] === "F" ||
        pipeMap[positionX - 1][positionY] === "|" ||
        pipeMap[positionX - 1][positionY] === "7" ||
        pipeMap[positionX - 1][positionY] === "S"
      )
    ) {
      positionX = positionX - 1;
      lastDirection = 'up';
      // console.log('up');
    } else if ( // right
      positionY + 1 < pipeMap[0].length && lastDirection !== 'left' && right &&
      (pipeMap[positionX][positionY + 1] === "-" ||
        pipeMap[positionX][positionY + 1] === "J" ||
        pipeMap[positionX][positionY + 1] === "7" ||
        pipeMap[positionX][positionY + 1] === "S"
      )
    ) {
      positionY = positionY + 1;
      lastDirection = 'right';
      // console.log('right');
    } else if ( // down
      positionX + 1 < pipeMap[0].length && lastDirection !== 'up' && down &&
      (pipeMap[positionX + 1][positionY] === "J" ||
        pipeMap[positionX + 1][positionY] === "|" ||
        pipeMap[positionX + 1][positionY] === "L" ||
        pipeMap[positionX + 1][positionY] === "S"
      )
    ) {
      positionX = positionX + 1;
      lastDirection = 'down';
      // console.log('down');
    } else if ( // left
      positionY - 1 >= 0 && lastDirection !== 'right' && left &&
      (pipeMap[positionX][positionY - 1] === "F" ||
        pipeMap[positionX][positionY - 1] === "-" ||
        pipeMap[positionX][positionY - 1] === "L" ||
        pipeMap[positionX][positionY - 1] === "S"
      )
    ) {
      positionY = positionY - 1;
      lastDirection = 'left';
      // console.log('left');
    }

    if(pipeMap[positionX][positionY] === '7') {
      up = false;
      right = false;
      left = true;
      down = true;
    } else if(pipeMap[positionX][positionY] === 'L') {
      up = true;
      right = true;
      left = false;
      down = false;
    } else if(pipeMap[positionX][positionY] === 'F') {
      up = false;
      right = true;
      left = false;
      down = true;
    } else if(pipeMap[positionX][positionY] === 'J') {
      up = true;
      right = false;
      left = true;
      down = false;
    } else if(pipeMap[positionX][positionY] === '-') {
      up = false;
      right = true;
      left = true;
      down = false;
    } else if(pipeMap[positionX][positionY] === '|') {
      up = true;
      right = false;
      left = false;
      down = true;
    }

    steps++;
  } while (pipeMap[positionX][positionY] !== 'S');

  return steps/2;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const pipeMap = input.split("\n").map((line) => line.split(""));
  const SolutionMap = input.split("\n").map((line) => line.split(""));
  let startX;
  let startY;

  for (let i = 0; i < pipeMap.length; i++) {
    for (let j = 0; j < pipeMap[0].length; j++) {
      if (pipeMap[i][j] === "S") {
        startX = i;
        startY = j;
      }
    }
  }

  let lastDirection = '';
  let positionX = startX;
  let positionY = startY;
  let steps = 0;

  let up = true;
  let right = true;
  let left = true;
  let down = true;

  let startDirection;
  let endDirection;

  do {
    if ( //up
      positionX - 1 >= 0 && lastDirection !== 'down' && up &&
      (pipeMap[positionX - 1][positionY] === "F" ||
        pipeMap[positionX - 1][positionY] === "|" ||
        pipeMap[positionX - 1][positionY] === "7" ||
        pipeMap[positionX - 1][positionY] === "S"
      )
    ) {
      positionX = positionX - 1;
      lastDirection = 'up';
    } else if ( // right
      positionY + 1 < pipeMap[0].length && lastDirection !== 'left' && right &&
      (pipeMap[positionX][positionY + 1] === "-" ||
        pipeMap[positionX][positionY + 1] === "J" ||
        pipeMap[positionX][positionY + 1] === "7" ||
        pipeMap[positionX][positionY + 1] === "S"
      )
    ) {
      positionY = positionY + 1;
      lastDirection = 'right';
    } else if ( // down
      positionX + 1 < pipeMap[0].length && lastDirection !== 'up' && down &&
      (pipeMap[positionX + 1][positionY] === "J" ||
        pipeMap[positionX + 1][positionY] === "|" ||
        pipeMap[positionX + 1][positionY] === "L" ||
        pipeMap[positionX + 1][positionY] === "S"
      )
    ) {
      positionX = positionX + 1;
      lastDirection = 'down';
    } else if ( // left
      positionY - 1 >= 0 && lastDirection !== 'right' && left &&
      (pipeMap[positionX][positionY - 1] === "F" ||
        pipeMap[positionX][positionY - 1] === "-" ||
        pipeMap[positionX][positionY - 1] === "L" ||
        pipeMap[positionX][positionY - 1] === "S"
      )
    ) {
      positionY = positionY - 1;
      lastDirection = 'left';
    }

    if(pipeMap[positionX][positionY] === '7') {
      up = false;
      right = false;
      left = true;
      down = true;
    } else if(pipeMap[positionX][positionY] === 'L') {
      up = true;
      right = true;
      left = false;
      down = false;
    } else if(pipeMap[positionX][positionY] === 'F') {
      up = false;
      right = true;
      left = false;
      down = true;
    } else if(pipeMap[positionX][positionY] === 'J') {
      up = true;
      right = false;
      left = true;
      down = false;
    } else if(pipeMap[positionX][positionY] === '-') {
      up = false;
      right = true;
      left = true;
      down = false;
    } else if(pipeMap[positionX][positionY] === '|') {
      up = true;
      right = false;
      left = false;
      down = true;
    }

    if(pipeMap[positionX][positionY]!=='S') {
      SolutionMap[positionX][positionY] = 'E';
    }
    if(steps === 0) startDirection = lastDirection;
    steps++;
  } while (pipeMap[positionX][positionY] !== 'S');
  endDirection = lastDirection;

  if(startDirection === 'up') {
    if(endDirection === 'right') pipeMap[positionX][positionY] = 'L';
    else if(endDirection === 'left') pipeMap[positionX][positionY] = 'J';
    else pipeMap[positionX][positionY] = '|';
  } else if(startDirection === 'right') {
    if(endDirection === 'up') pipeMap[positionX][positionY] = 'F';
    else if(endDirection === 'down') pipeMap[positionX][positionY] = '7';
    else pipeMap[positionX][positionY] = '-';
  } else if(startDirection === 'left') {
    if(endDirection === 'up') pipeMap[positionX][positionY] = 'L';
    else if(endDirection === 'down') pipeMap[positionX][positionY] = 'F';
    else pipeMap[positionX][positionY] = '-';
  } else if(startDirection === 'down') {
    if(endDirection === 'up') pipeMap[positionX][positionY] = 'J';
    else if(endDirection === 'down') pipeMap[positionX][positionY] = '7';
    else pipeMap[positionX][positionY] = '|';
  }

  SolutionMap[positionX][positionY] = 'E';

  for(let i = 0; i < pipeMap.length; i++) {
    let valid = false;
    let hasF = false;
    let hasJ = false;
    let hasL = false;
    let has7 = false;
    for(let j = 0; j < pipeMap[i].length; j++) {
      if(SolutionMap[i][j]==='E') {
        if(pipeMap[i][j]==='|') {
          valid = !valid;
          continue;
        }

        if(pipeMap[i][j]==='F') {
          hasF = true;
        }
        else if(pipeMap[i][j]==='J') {
          hasJ = true;
        }
        else if(pipeMap[i][j]==='L') {
          hasL = true;
        }
        else if(pipeMap[i][j]==='7') {
          has7 = true;
        }

        if((hasF && hasJ) || (hasL && has7)) {
          valid = !valid;
          hasF = false;
          hasJ = false;
          hasL = false;
          has7 = false;
        } else if((hasF && has7) || (hasL && hasJ)){
          hasF = false;
          hasJ = false;
          hasL = false;
          has7 = false;
        }
      } else if(valid) {
        SolutionMap[i][j] = 'I';
      } else {
        SolutionMap[i][j] = '.';
      }
    }
  }

  let result = 0;
  for(let row of SolutionMap) {
    for(let cell of row) {
      if(cell === 'I') result++;
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`,
        expected: 8,
      },
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
