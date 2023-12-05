import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = rawInput;

  let splitInput = input.split(/\r?\n\s*\r?\n/);
  let seeds = splitInput[0].split(':')[1].trim().split(' ').map(Number);
  let seedsToSoilMap = splitInput[1].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let soilToFertilizerMap = splitInput[2].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let fertilizerToWaterMap = splitInput[3].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let waterToLightMap = splitInput[4].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let lightToTemperatureMap = splitInput[5].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let temperatureToHumidityMap = splitInput[6].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let humidityToLocationMap = splitInput[7].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));

  let result;

  result = somethingToSomethingMap(seeds, seedsToSoilMap);
  result = somethingToSomethingMap(result, soilToFertilizerMap);
  result = somethingToSomethingMap(result, fertilizerToWaterMap);
  result = somethingToSomethingMap(result, waterToLightMap);
  result = somethingToSomethingMap(result, lightToTemperatureMap);
  result = somethingToSomethingMap(result, temperatureToHumidityMap);
  result = somethingToSomethingMap(result, humidityToLocationMap);

  return Math.min(...result);
};

function somethingToSomethingMap(seeds, seedsToSoilMap) {
  let result = [];

  for(let seed of seeds) {
    seed = parseInt(seed);
    let resultFound = false;
    for(let seedsToSoil of seedsToSoilMap) {
      let part1 = parseInt(seedsToSoil[0]);
      let part2 = parseInt(seedsToSoil[1]);
      let part3 = parseInt(seedsToSoil[2]);
      if(seed >= part2 && seed < part2+part3) {
        result.push(parseInt((part1-part2)+seed));
        resultFound = true;
      }
    }
    if(!resultFound) result.push(seed);
  }

  return result;
}

const part2 = (rawInput) => {
  const input = rawInput;

  let splitInput = input.split(/\r?\n\s*\r?\n/);
  let seeds = splitInput[0].split(':')[1].trim().split(' ').map(Number);

  let seedsToSoilMap = splitInput[1].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let soilToFertilizerMap = splitInput[2].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let fertilizerToWaterMap = splitInput[3].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let waterToLightMap = splitInput[4].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let lightToTemperatureMap = splitInput[5].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let temperatureToHumidityMap = splitInput[6].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));
  let humidityToLocationMap = splitInput[7].split(':')[1].trim().split('\n').map(e => e.split(' ').map(Number));

  let result;

  let found = false;

  let solution;

  let counter = 0;
  while(!found) {
    result = somethingToSomethingMap2(counter, humidityToLocationMap);
    result = somethingToSomethingMap2(result, temperatureToHumidityMap);
    result = somethingToSomethingMap2(result, lightToTemperatureMap);
    result = somethingToSomethingMap2(result, waterToLightMap);
    result = somethingToSomethingMap2(result, fertilizerToWaterMap);
    result = somethingToSomethingMap2(result, soilToFertilizerMap);
    result = somethingToSomethingMap2(result, seedsToSoilMap);


    found = containsSolution(seeds, result);
    if(found) solution = counter;
    counter++;
  }

  return solution;
};

function containsSolution(seeds, input) {
  for(let i = 0; i < seeds.length; i+=2) {
    if(input >= seeds[i] && input < seeds[i]+seeds[i+1]) {
      return true;
    }
  }
  return false;
}

function somethingToSomethingMap2(seed, seedsToSoilMap) {
  let result;

  let resultFound = false;
  for(let seedsToSoil of seedsToSoilMap) {
    let part1 = seedsToSoil[0];
    let part2 = seedsToSoil[1];
    let part3 = seedsToSoil[2];
    if(seed >= part1 && seed < part1+part3) {
      result = (part2-part1)+seed;
      resultFound = true;
    }
  }
  if(!resultFound) result = seed;


  return result;
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
