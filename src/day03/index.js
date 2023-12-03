import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {

  const input = rawInput;

  let array = [];

  for(let row of input.trim().split("\n")) {
    let columns = row.split('');
    array.push(columns);
  }

  printArray(array);

  let arrayCheck = [];

  for(let i = 0; i < array.length; i++) {
    let row = [];
    for(let j = 0; j < array[i].length; j++) {
      row.push("X");
    }
    arrayCheck.push(row);
  }

  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array[i].length; j++) {
      if(!isDigit(array[i][j]) && array[i][j] != '.') {
        arrayCheck[i][j] = 'O';
        let valid1 = i-1 >= 0;
        let valid2 = j-1 >= 0;
        let valid3 = i+1 <= array.length - 1;
        let valid4 = j+1 <= array[i].length - 1;

        if(valid1 && valid2) arrayCheck[i-1][j-1] = 'O';
        if(valid1) arrayCheck[i-1][j] = 'O';
        if(valid1 && valid4) arrayCheck[i-1][j+1] = 'O';

        if(valid2) arrayCheck[i][j-1] = 'O';
        if(valid4) arrayCheck[i][j+1] = 'O';

        if(valid3 && valid2) arrayCheck[i+1][j-1] = 'O';
        if(valid3) arrayCheck[i+1][j] = 'O';
        if(valid3 && valid4) arrayCheck[i+1][j+1] = 'O';
      }
    }
  }

  let result = 0;

  for(let i = 0; i < array.length; i++) {
    let number = '';
    let digitFound = false;
    let numberValid = false;
    for(let j = 0; j < array[0].length; j++) {
      // is digit
      if(isDigit(array[i][j])) {
        digitFound = true;
        number += array[i][j];

        if(arrayCheck[i][j] == 'O') {
          numberValid = true;
        }

        if(j+1 >= array[0].length || !isDigit(array[i][j+1])) {
          if(numberValid) {
            result += parseInt(number);
          }
          number = '';
          digitFound = false;
          numberValid = false;
        }
      }
    }
  }

  return result;
};

function isDigit(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 48 && charCode <= 57;
}

function printArray(array) {
  let result = '';
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array[0].length; j++) {
      result += array[i][j];
    }
    result += '\n';
  }
}

const part2 = (rawInput) => {
  const input = rawInput;

  let array = [];

  for (let row of input.trim().split("\n")) {
    let columns = row.split("");
    array.push(columns);
  }

  let arrayCheck = [];
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    let row = [];
    for (let j = 0; j < array[i].length; j++) {
      row.push("X");
    }
    arrayCheck.push(row);
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == "*") {
        arrayCheck[i][j] = counter;
        let valid1 = i - 1 >= 0;
        let valid2 = j - 1 >= 0;
        let valid3 = i + 1 <= array.length - 1;
        let valid4 = j + 1 <= array[i].length - 1;

        if (valid1 && valid2) arrayCheck[i - 1][j - 1] = counter;
        if (valid1) arrayCheck[i - 1][j] = counter;
        if (valid1 && valid4) arrayCheck[i - 1][j + 1] = counter;

        if (valid2) arrayCheck[i][j - 1] = counter;
        if (valid4) arrayCheck[i][j + 1] = counter;

        if (valid3 && valid2) arrayCheck[i + 1][j - 1] = counter;
        if (valid3) arrayCheck[i + 1][j] = counter;
        if (valid3 && valid4) arrayCheck[i + 1][j + 1] = counter;

        counter++;
      }
    }
  }

  let resultMap = new Map();

  for (let i = 0; i < counter; i++) {
    resultMap.set(i, []);
  }

  let result = 0;

  for (let i = 0; i < array.length; i++) {
    let number = "";
    let digitFound = false;
    let numberValid = false;
    let numberCounter;
    for (let j = 0; j < array[0].length; j++) {
      // is digit
      if (isDigit(array[i][j])) {
        digitFound = true;
        number += array[i][j];

        if (isDigit(arrayCheck[i][j].toString())) {
          numberValid = true;
          numberCounter = arrayCheck[i][j];
        }

        if (j + 1 >= array[0].length || !isDigit(array[i][j + 1])) {
          if (numberValid) {
            result += parseInt(number);
            resultMap.get(numberCounter).push(parseInt(number));
          }
          number = "";
          digitFound = false;
          numberValid = false;
        }
      }
    }
  }

  let resultFinal = 0;

  for (let key of resultMap.keys()) {
    if(resultMap.get(key).length == 2) resultFinal += resultMap.get(key)[0] * resultMap.get(key)[1];
  }

  return resultFinal;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
