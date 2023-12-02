import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const gameRules = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let result = 0;

  for (let game of input.split("\n")) {
    let validGame = true;
    let gameNumber = parseInt(game.split(":")[0].split(" ")[1]);
    let gameResults = game.split(":")[1].trim();
    for (let set of gameResults.split(";")) {
      for (let subset of set.split(",")) {
        let number = parseInt(subset.trim().split(" ")[0]);
        let color = subset.trim().split(" ")[1];
        if (number > gameRules[color]) {
          validGame = false;
          break;
        }
      }
      if (!validGame) {
        break;
      }
    }
    if (validGame) result += gameNumber;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let maxSet = {
    red: 0,
    green: 0,
    blue: 0,
  };

  let result = 0;

  for (let game of input.split("\n")) {
    let gameResults = game.split(":")[1].trim();
    for (let set of gameResults.split(";")) {
      for (let subset of set.split(",")) {
        let number = parseInt(subset.trim().split(" ")[0]);
        let color = subset.trim().split(" ")[1];
        if (number > maxSet[color]) {
          maxSet[color] = number;
        }
      }
    }
    result += maxSet["red"] * maxSet["green"] * maxSet["blue"];
    maxSet["red"] = 0;
    maxSet["green"] = 0;
    maxSet["blue"] = 0;
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
