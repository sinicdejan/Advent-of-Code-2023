import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = rawInput;

  let cards = input.trim().split("\n");

  let finalResult = 0;

  for(let card of input.trim().split("\n")) {
    let cardNumber = card.split(":")[0].replace(/\D/g, '');
    let part1 = card.split(":")[1].split('|')[0].trim().split(/\s+/);
    let part2 = card.split(":")[1].split('|')[1].trim().split(/\s+/);

    let result = 0;

    for(let numberSolution of part1) {
      for(let numberFound of part2) {
        if(numberFound == numberSolution) {
          result++;
        }
      }
    }

    finalResult += Math.floor(Math.pow(2, result-1));
  }

  return finalResult;
};

const part2 = (rawInput) => {
  const input = rawInput;

  let resultMap = new Map();

  let cards = input.trim().split("\n");

  for (let i = 1; i <= cards.length; i++) {
    resultMap.set(i, []);
  }

  for(let card of cards) {
    let cardNumber = card.split(":")[0].replace(/\D/g, '');
    let part1 = card.split(":")[1].split('|')[0].trim().split(/\s+/);
    let part2 = card.split(":")[1].split('|')[1].trim().split(/\s+/);

    let result = 0;

    for(let numberSolution of part1) {
      for(let numberFound of part2) {
        if(numberFound == numberSolution) {
          result++;
        }
      }
    }

    for(let j = 0; j < result; j++) {
      cards.push(cards[parseInt(cardNumber) + j]);
    }

    resultMap.get(parseInt(cardNumber)).push(result);
  }

  return cards.length;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});