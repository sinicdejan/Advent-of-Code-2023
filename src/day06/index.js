import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = rawInput;

  let times = input.split('\n')[0].split(/\s+/).splice(1).map(Number);
  let distances = input.split('\n')[1].split(/\s+/).splice(1).map(Number);

  let result = 1;

  for(let i = 0; i < times.length; i++) {
    let wins = 0;
    for(let j = 0; j < times[i]; j++) {
      if(((times[i] - j) * j) > distances[i]) {
        wins++;
      }
    }
    result *= wins;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = rawInput;

  let times = parseInt(input.split('\n')[0].split(':')[1].replace(/\s/g,''));
  let distances = parseInt(input.split('\n')[1].split(':')[1].replace(/\s/g,''));

  let wins = 0;

  for(let i = 0; i < times; i++) {
    if(((times - i) * i) > distances) {
      wins++;
    }
  }

  return wins;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
