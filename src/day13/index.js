import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let horizontal = calculateReflections(rawInput);

  let vertical = calculateReflections(transposeInput(rawInput));

  let total = vertical + horizontal * 100;

  return total;
};

function calculateReflections(input) {
  let result = 0;
  for(let mirror of input.split(/\n{2,}/).map((array) => array.split('\n'))) {
    console.log(mirror);
    let i = 0;
    let j = 1;
    let found = false;
    let reflection = 0;
    while(i >= 0 && i < mirror.length && j >= 0 && j < mirror.length) {
      console.log(i + ' ' + j + ' ' + (mirror[i] === mirror[j]));

      if(mirror[i] === mirror[j]) {
        if(!found) reflection += i+1;
        found = true;
      } else if(found) {
        i = reflection;
        j = i+1;
        reflection = 0;
        found = false;
      }

      if(!found) i++;
      else i--;

      j++;
    }
    console.log(reflection);
    result += reflection;
  }
  return result;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

function transposeInput(inputString) {
  let blocks = inputString.trim().split('\n\n');

  let transposedBlocks = blocks.map(block => {
    let array = block.split('\n').map(row => row.split(''));
    let transposedArray = array[0].map((col, i) => array.map(row => row[i]));
    return transposedArray.map(row => row.join('')).join('\n');
  });

  return transposedBlocks.join('\n\n');
}

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 405,
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
