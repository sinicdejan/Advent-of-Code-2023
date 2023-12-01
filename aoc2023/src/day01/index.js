import run from "aocrunner";

const parseInput = (rawInput) => {
  rawInput = rawInput.replace(/one/g, 'one1one');
  rawInput = rawInput.replace(/two/g, 'two2two');
  rawInput = rawInput.replace(/three/g, 'three3three');
  rawInput = rawInput.replace(/four/g, 'four4four');
  rawInput = rawInput.replace(/five/g, 'five5five');
  rawInput = rawInput.replace(/six/g, 'six6six');
  rawInput = rawInput.replace(/seven/g, 'seven7seven');
  rawInput = rawInput.replace(/eight/g, 'eight8');
  rawInput = rawInput.replace(/nine/g, 'nine9nine');

  return rawInput;
};

const part1 = (rawInput) => {
  const input = rawInput;
  const lines = input.trim().split('\n');
  const array = lines.map(line => line.split(''));
  const resultArray = [];
  for(let i = 0; i < array.length; i++) {
    const row = array[i];
    const rowNumber = [];
    for(let j = 0; j < row.length; j++) {
      if(isDigit(row[j])) {
        rowNumber.push(parseInt(row[j]));
        break;
      }
    }
    for(let j = row.length - 1; j >= 0; j--) {
      if(isDigit(row[j])) {
        rowNumber.push(parseInt(row[j]));
        break;
      }
    }
    const resultString = rowNumber.join('');
    resultArray.push(parseInt(resultString));
  }

  let result = 0;
  for(let resultRow of resultArray) {
    result += resultRow;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.trim().split('\n');
  const array = lines.map(line => line.split(''));
  const resultArray = [];
  for(let i = 0; i < array.length; i++) {
    const row = array[i];
    const rowNumber = [];
    for(let j = 0; j < row.length; j++) {
      if(isDigit(row[j])) {
        rowNumber.push(parseInt(row[j]));
        break;
      }
    }
    for(let j = row.length - 1; j >= 0; j--) {
      if(isDigit(row[j])) {
        rowNumber.push(parseInt(row[j]));
        break;
      }
    }
    const resultString = rowNumber.join('');
    resultArray.push(parseInt(resultString));
  }

  let result = 0;
  for(let resultRow of resultArray) {
    result += resultRow;
  }

  return result;
};

function isDigit(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 48 && charCode <= 57; // ASCII range for digits
}

run({
  part1: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
