import run from "aocrunner";

const parseInput = (rawInput) => {
  return duplicateRows(rawInput);
};

let TIMES;

function duplicateRows(input) {
  const inputs = input.split('\n');

  const duplicatedRows = inputs.map(line => {
    const [prefix, values] = line.split(' ');

    const duplicatedValues = Array.from({ length: TIMES }, () => values).join(',');

    const repeatedPrefix = Array.from({ length: TIMES }, () => prefix).join('?');

    return `${repeatedPrefix} ${duplicatedValues}`;
  });

  return duplicatedRows.join('\n');
}

function valid(signs, numbers, result, indexes) {
  for(let i = 0; i < result.length; i++) {
    signs[indexes[result[i]]] = '#';
  }

  let signsToNumbers = signs.join('').split(/[^#]+/).filter(Boolean).map((signs) => signs.length);

  return JSON.stringify(numbers) === JSON.stringify(signsToNumbers)
}

const process = (rawInput) => {
  const input = parseInput(rawInput);
  let signs = input.split('\n').map((line) => line.split(' ')[0].split(''));
  let numbers = input.split('\n').map((line) => line.split(' ')[1].split(',').map(Number));
  let sums = numbers.map(number => number.reduce((acc, curr) => acc + parseInt(curr), 0));
  let hashtagCount = signs.map(signs => signs.reduce((count, element) => element === '#' ? count + 1 : count, 0));

  let comb = 0;

  let finalResult = new Map();
  for(let k = 0; k < signs.length; k++) {
    finalResult.set(k, 0);
  }
  for(let k = 0; k < signs.length; k++) {
    let missing = sums[k] - hashtagCount[k];
    if(missing === 0) finalResult.set(k, finalResult.get(k)+1);


    let currentSign = [];
    let indexes = [];
    for (let j = 0; j < signs[k].length; j++) {
      currentSign.push(signs[k][j]);
      if (signs[k][j] === '?') indexes.push(j);
    }

    let result = [];
    for (let i = 0; i < indexes.length; i++) {
      result.push(i);
      if (result.length === missing) {
        if (valid(currentSign, numbers[k], result, indexes)) {
          finalResult.set(k, finalResult.get(k)+1);
        }
        comb++;
        currentSign = [...signs[k]];
        i = result.pop();

      }
      while (i + 1 === indexes.length) {
        i = result.pop();
      }
    }
  }

  return finalResult;
};

const part2 = (rawInput) => {
  TIMES = 1;
  let map1 = process(rawInput);

  TIMES = 2;
  let map2 = process(rawInput);

  let result = 0;
  for(let key of map1.keys()) {
    let factor = map2.get(key) / map1.get(key);
    result += map1.get(key)*Math.pow(factor, 4);
  }

  return result;
};

const part1 = (rawInput) => {
  TIMES = 1;
  let map1 = process(rawInput);

  let result = 0;
  for(let key of map1.keys()) {
    result += map1.get(key);
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
