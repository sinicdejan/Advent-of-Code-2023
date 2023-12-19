import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

let maxEnergized = 0;
let glassBox;
let energizedBox;
let stack;
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  glassBox = input.split("\n").map((line) => line.split(""));
  energizedBox = [];
  stack = [];

  for(let i = 0; i < glassBox.length; i++) {
    energizedBox.push([]);
    for(let j = 0; j < glassBox[i].length; j++) {
      energizedBox[i].push([]);
    }
  }

  stack.push({
    i: 0,
    j: 0,
    dir: "RIGHT",
  });

  while (stack.length !== 0) {
    let state = stack.pop();

    if(!stateIsValid(state)) {
      continue;
    }

    if(energizedBox[state.i][state.j].includes(state.dir)) {
      continue;
    } else {
      energizedBox[state.i][state.j].push(state.dir);
    }

    if (state.dir === "UP") {
      if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "|") {
        state.i -= 1;
        stack.push(state);
      } else if(glassBox[state.i][state.j] === "-") {
        stack.push(createState(state.i, state.j - 1, 'LEFT'));
        stack.push(createState(state.i, state.j + 1, 'RIGHT'));
      } else if(glassBox[state.i][state.j] === "/") {
        stack.push(createState(state.i, state.j + 1, 'RIGHT'));
      } else if(glassBox[state.i][state.j] === "\\") {
        stack.push(createState(state.i, state.j - 1, 'LEFT'));
      }
    } else if (state.dir === "RIGHT") {
      if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "-") {
        state.j += 1;
        stack.push(state);
      } else if(glassBox[state.i][state.j] === "|") {
        stack.push(createState(state.i - 1, state.j, 'UP'));
        stack.push(createState(state.i + 1, state.j, 'DOWN'));
      } else if(glassBox[state.i][state.j] === "/") {
        stack.push(createState(state.i - 1, state.j, 'UP'));
      } else if(glassBox[state.i][state.j] === "\\") {
        stack.push(createState(state.i + 1, state.j, 'DOWN'));
      }
    } else if (state.dir === "DOWN") {
      if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "|") {
        state.i += 1;
        stack.push(state);
      } else if(glassBox[state.i][state.j] === "-") {
        stack.push(createState(state.i, state.j - 1, 'LEFT'));
        stack.push(createState(state.i, state.j + 1, 'RIGHT'));
      } else if(glassBox[state.i][state.j] === "/") {
        stack.push(createState(state.i, state.j - 1, 'LEFT'));
      } else if(glassBox[state.i][state.j] === "\\") {
        stack.push(createState(state.i, state.j + 1, 'RIGHT'));
      }
    } else if (state.dir === "LEFT") {
      if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "-") {
        state.j -= 1;
        stack.push(state);
      } else if(glassBox[state.i][state.j] === "|") {
        stack.push(createState(state.i - 1, state.j, 'UP'));
        stack.push(createState(state.i + 1, state.j, 'DOWN'));
      } else if(glassBox[state.i][state.j] === "/") {
        stack.push(createState(state.i + 1, state.j, 'DOWN'));
      } else if(glassBox[state.i][state.j] === "\\") {
        stack.push(createState(state.i - 1, state.j, 'UP'));
      }
    }
  }

  return countEnergized();
};

function countEnergized() {
  let result = 0;
  for(let i = 0; i < energizedBox.length; i++) {
    for(let j = 0; j < energizedBox[i].length; j++) {
      if(energizedBox[i][j].length !== 0) result += 1;
    }
  }

  return result;
}

function createState(i, j, dir) {
  return {
    i: i,
    j: j,
    dir: dir
  }
}

function stateIsValid(state) {
  if (
    state.i < glassBox.length &&
    state.i > -1 &&
    state.j < glassBox[state.i].length &&
    state.j > -1
  ) {
    return true;
  }
  return false;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  glassBox = input.split("\n").map((line) => line.split(""));

  let startingPositions = [];

  for(let j = 0; j < glassBox[0].length; j++) {
    startingPositions.push({
      i: 0,
      j: j,
      dir: 'DOWN'
    });
    startingPositions.push({
      i: glassBox.length-1,
      j: j,
      dir: 'UP'
    });
  }

  for(let i = 0; i < glassBox.length; i++) {
    startingPositions.push({
      i: i,
      j: 0,
      dir: 'RIGHT'
    });
    startingPositions.push({
      i: i,
      j: glassBox[0].length-1,
      dir: 'LEFT'
    });
  }

  for(let startingPosition of startingPositions) {
    energizedBox = [];
    stack = [];

    for(let i = 0; i < glassBox.length; i++) {
      energizedBox.push([]);
      for(let j = 0; j < glassBox[i].length; j++) {
        energizedBox[i].push([]);
      }
    }

    stack.push(startingPosition);

    while (stack.length !== 0) {
      let state = stack.pop();

      if (!stateIsValid(state)) {
        continue;
      }

      if (energizedBox[state.i][state.j].includes(state.dir)) {
        continue;
      } else {
        energizedBox[state.i][state.j].push(state.dir);
      }

      if (state.dir === "UP") {
        if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "|") {
          state.i -= 1;
          stack.push(state);
        } else if (glassBox[state.i][state.j] === "-") {
          stack.push(createState(state.i, state.j - 1, 'LEFT'));
          stack.push(createState(state.i, state.j + 1, 'RIGHT'));
        } else if (glassBox[state.i][state.j] === "/") {
          stack.push(createState(state.i, state.j + 1, 'RIGHT'));
        } else if (glassBox[state.i][state.j] === "\\") {
          stack.push(createState(state.i, state.j - 1, 'LEFT'));
        }
      } else if (state.dir === "RIGHT") {
        if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "-") {
          state.j += 1;
          stack.push(state);
        } else if (glassBox[state.i][state.j] === "|") {
          stack.push(createState(state.i - 1, state.j, 'UP'));
          stack.push(createState(state.i + 1, state.j, 'DOWN'));
        } else if (glassBox[state.i][state.j] === "/") {
          stack.push(createState(state.i - 1, state.j, 'UP'));
        } else if (glassBox[state.i][state.j] === "\\") {
          stack.push(createState(state.i + 1, state.j, 'DOWN'));
        }
      } else if (state.dir === "DOWN") {
        if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "|") {
          state.i += 1;
          stack.push(state);
        } else if (glassBox[state.i][state.j] === "-") {
          stack.push(createState(state.i, state.j - 1, 'LEFT'));
          stack.push(createState(state.i, state.j + 1, 'RIGHT'));
        } else if (glassBox[state.i][state.j] === "/") {
          stack.push(createState(state.i, state.j - 1, 'LEFT'));
        } else if (glassBox[state.i][state.j] === "\\") {
          stack.push(createState(state.i, state.j + 1, 'RIGHT'));
        }
      } else if (state.dir === "LEFT") {
        if (glassBox[state.i][state.j] === "." || glassBox[state.i][state.j] === "-") {
          state.j -= 1;
          stack.push(state);
        } else if (glassBox[state.i][state.j] === "|") {
          stack.push(createState(state.i - 1, state.j, 'UP'));
          stack.push(createState(state.i + 1, state.j, 'DOWN'));
        } else if (glassBox[state.i][state.j] === "/") {
          stack.push(createState(state.i + 1, state.j, 'DOWN'));
        } else if (glassBox[state.i][state.j] === "\\") {
          stack.push(createState(state.i - 1, state.j, 'UP'));
        }
      }
    }

    let energized = countEnergized();

    if(energized > maxEnergized) maxEnergized = energized;
  }

  return maxEnergized;
};

run({
  part1: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
