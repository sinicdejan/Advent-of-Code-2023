import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const MULTIPLIER = 17;
const HASH_SIZE = 256;
let boxes;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let result = 0;
  for(let string of input.split(',')) {
    let hashValue = 0;
    for(let i = 0; i < string.length; i++) {
      hashValue += string.charCodeAt(i);
      hashValue *= MULTIPLIER;
      hashValue %= HASH_SIZE;
    }
    result += hashValue;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  boxes = new Map();
  for(let i = 0; i < 256; i++) {
    boxes.set(i, []);
  }

  let result = 0;
  for(let string of input.split(',')) {
    if(string.includes('=')) { // ADD
      let lensValue = string.split('=')[0];
      let boxIndex = hash(lensValue);
      let lensBox = getLensBox(boxIndex, lensValue);
      if(lensBox > -1) {
        boxes.get(boxIndex)[lensBox] = string.replace('=', ' ');
      } else {
        boxes.get(boxIndex).push(string.replace('=', ' '));
      }
    } else if(string.includes('-')) { // REMOVE
      let lensValue = string.split('-')[0];
      let boxIndex = hash(lensValue);
      let lensBox = getLensBox(boxIndex, lensValue);
      if(lensBox > -1) {
        boxes.get(boxIndex).splice(lensBox, 1);
      }
    }
  }

  return getFocusingPower();
};

function hash(input) {
  let result = 0;
  for(let string of input.split(',')) {
    let hashValue = 0;
    for(let i = 0; i < string.length; i++) {
      hashValue += string.charCodeAt(i);
      hashValue *= MULTIPLIER;
      hashValue %= HASH_SIZE;
    }
    result += hashValue;
  }

  return result;
}

function getLensBox(index, value) {
  let box = boxes.get(index);
  for(let i = 0; i < box.length; i++) {
    if(box[i].split(' ')[0].includes(value)) {
      return i;
    }
  }

  return -1;
}

function getFocusingPower() {
  let result = 0;
  for(let i = 0; i < boxes.size; i++) {
    for(let j = 0; j < boxes.get(i).length; j++) {
      result += (i+1) * (j+1) * boxes.get(i)[j].split(' ')[1];
    }
  }
  return result;
}

run({
  part1: {
    tests: [
      {
        input: `HASH`,
        expected: 52,
      },
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
