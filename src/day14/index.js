import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let map = input.split('\n').map(e => e.split(''));

  let sum = 0;
  for(let j = 0; j < map[0].length; j++) {
    let value = map.length;
    for(let i = 0; i < map.length; i++) {
      if(map[i][j] === 'O') {
        sum += value;
        value--;
      }
      else if(map[i][j] === '.') {

      }
      else if(map[i][j] === '#') {
        value = map.length - i - 1;
      }
    }
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
