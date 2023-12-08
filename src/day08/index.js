import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let lines = input.split('\n');
  let instructions = lines[0];
  let inputMap = lines.splice(2);
  let start = 'AAA';
  let end = 'ZZZ';

  console.log(instructions.length);
  console.log(start);
  console.log(end);

  const resultMap = new Map();

  inputMap.forEach(line => {
    const [name, rest] = line.split('=');
    const [left, right] = rest.slice(2, -1).split(',');

    const obj = {
      Name: name.trim(),
      Left: left.trim(),
      Right: right.trim()
    };
    resultMap.set(obj.Name, obj);
  });

  let location = start;

  let i = 0;
  let instructionSize = instructions.length;
  let steps = 0;
  while(location != end) {

    if(i == instructionSize) {
      i = 0;
    }

    if(instructions[i] == 'L') {
      location = resultMap.get(location).Left;
    } else if(instructions[i] == 'R') {
      location = resultMap.get(location).Right;
    }

    steps++;
    i++;
  }

  return steps;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let lines = input.split('\n');
  let instructions = lines[0];
  let inputMap = lines.splice(2);
  let startNodes = [];
  let endNodes = [];

  const resultMap = new Map();

  inputMap.forEach(line => {
    const [name, rest] = line.split('=');
    const [left, right] = rest.slice(2, -1).split(',');

    if (name.trim().endsWith('A')) startNodes.push(name.trim());
    else if (name.trim().endsWith('Z')) endNodes.push(name.trim());

    const obj = {
      Name: name.trim(),
      Left: left.trim(),
      Right: right.trim()
    };
    resultMap.set(obj.Name, obj);

  });

  let locations = [...startNodes];

  let instructionSize = instructions.length;

  let result = instructionSize;

  for(let location of locations) {
    let i = 0;
    let steps = 0;
    while(!location.endsWith('Z')) {
      if(i == instructionSize) {
        i = 0;
      }

      if(instructions[i] == 'L') {
        location = resultMap.get(location).Left;
      } else if(instructions[i] == 'R') {
        location = resultMap.get(location).Right;
      }

      steps++;
      i++;
    }
    result *= (steps/instructionSize);
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
