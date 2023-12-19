import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const inputMap = input.split("\n").map(line => line.split(" ").map(Number));

  let result = 0;

  for(let line = 0; line < inputMap.length; line++) {
    for(let i = 0; i < inputMap[line].length; i++) {
      let rowSumIsZero = true;
      for(let j = 1; j < inputMap[line].length-i; j++) {
        inputMap[line][j-1] = inputMap[line][j] - inputMap[line][j-1];
        if(inputMap[line][j-1]!=0) rowSumIsZero = false;
      }

      result += inputMap[line][inputMap[line].length-(i+1)];
      if(rowSumIsZero) {
        break;
      }
    }
  }


  console.log(result);

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const inputMap = input.split("\n").map(line => line.split(" ").map(Number));
  const inputMapCopy = input.split("\n").map(line => line.split(" ").map(Number));

  for(let line = 0; line < inputMap.length; line++) {
    let result = 0;
    for(let i = 0; i < inputMap[line].length; i++) {
      let rowSumIsZero = true;
      for(let j = 1; j < inputMap[line].length-i; j++) {
        inputMap[line][j-1] = inputMap[line][j] - inputMap[line][j-1];
        if(inputMap[line][j-1]!==0) rowSumIsZero = false;
      }
      result += inputMap[line][inputMap[line].length-(i+1)];
      if(rowSumIsZero) {
        break;
      }
    }
    inputMapCopy[line].push(result);
    inputMapCopy[line].reverse();
  }

  let finalResult = 0;

  for(let line = 0; line < inputMapCopy.length; line++) {
    for(let i = 0; i < inputMapCopy[line].length; i++) {
      let rowSumIsZero = true;
      for(let j = 1; j < inputMapCopy[line].length-i; j++) {
        inputMapCopy[line][j-1] = inputMapCopy[line][j] - inputMapCopy[line][j-1];
        if(inputMapCopy[line][j-1]!==0) rowSumIsZero = false;
      }

      finalResult += inputMapCopy[line][inputMapCopy[line].length-(i+1)];
      if(rowSumIsZero) {
        break;
      }
    }
  }

  return finalResult;
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
