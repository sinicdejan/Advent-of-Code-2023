import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = rawInput;

  let cardMap = new Map();
  cardMap.set('2', '02');
  cardMap.set('3', '03');
  cardMap.set('4', '04');
  cardMap.set('5', '05');
  cardMap.set('6', '06');
  cardMap.set('7', '07');
  cardMap.set('8', '08');
  cardMap.set('9', '09');
  cardMap.set('T', '10');
  cardMap.set('J', '11');
  cardMap.set('Q', '12');
  cardMap.set('K', '13');
  cardMap.set('A', '14');

  let cards = input.split('\n').map(e => e.split(' ')[0]);

  const cardToBidMap = new Map(input.split('\n').map(line => {
    const [key, value] = line.split(' ');
    return [key, Number(value)];
  }));

  let handValueMap = new Map();

  for(let i = 0; i < cards.length; i++) {
    let cardCountMap = new Map();

    for(let j = 0; j < cards[i].length; j++) {
      cardCountMap.set(cards[i][j], (cardCountMap.get(cards[i][j]) || 0) + 1);
    }

    let cardCount = [...cardCountMap];

    cardCount.sort((a, b) => b[1] - a[1]);

    let handValue = '';

    if(cardCount.length == 1) {
      handValue += cardMap.get(cardCount[0][0]);
    } else {
      handValue += '00';
    }

    if(cardCount.length == 2) {
      if(cardCount[0][1] == 4 || cardCount[1][1] == 4) {
        handValue += '2';
      } else {
        handValue += '1';
      }
    } else {
      handValue += '0';
    }

    if(cardCount.length == 3) {
      if(cardCount[0][1] == 3 || cardCount[1][1] == 3) {
        handValue += '2';
      }else {
        handValue += '1';
      }
    } else {
      handValue += '0';
    }

    if(cardCount.length == 4) {
      handValue += '1';
    } else {
      handValue += '0';
    }

    for(let j = 0; j < cards[i].length; j++) {
      handValue += cardMap.get(cards[i][j]);
    }

    handValueMap.set(cards[i], handValue);
  }

  const sortedHandValues = [...handValueMap.entries()].sort((a, b) => {
    const strA = a[1];
    const strB = b[1];

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });

  let result = 0;
  for(let i = 0; i < sortedHandValues.length; i++) {
    result += cardToBidMap.get(sortedHandValues[i][0]) * (i+1);
  }

  return result;
};

const part2 = (rawInput) => {
  const input = rawInput;

  let cardMap = new Map();
  cardMap.set('J', '01');
  cardMap.set('2', '02');
  cardMap.set('3', '03');
  cardMap.set('4', '04');
  cardMap.set('5', '05');
  cardMap.set('6', '06');
  cardMap.set('7', '07');
  cardMap.set('8', '08');
  cardMap.set('9', '09');
  cardMap.set('T', '10');
  cardMap.set('Q', '11');
  cardMap.set('K', '12');
  cardMap.set('A', '13');

  let cards = input.split('\n').map(e => e.split(' ')[0]);

  const cardToBidMap = new Map(input.split('\n').map(line => {
    const [key, value] = line.split(' ');
    return [key, Number(value)];
  }));

  let handValueMap = new Map();

  for(let i = 0; i < cards.length; i++) {
    let cardCountMap = new Map();

    for(let j = 0; j < cards[i].length; j++) {
      cardCountMap.set(cards[i][j], (cardCountMap.get(cards[i][j]) || 0) + 1);
    }

    let cardCount = [...cardCountMap];

    cardCount.sort((a, b) => b[1] - a[1]);

    let jokerCount = 0;

    let cardCountModified = [];

    for(let i = 0; i < cardCount.length; i++) {
      if(cardCount[i][0] == 'J' && cardCount.length > 1) {
        jokerCount = cardCount[i][1];
      } else {
        cardCountModified.push(cardCount[i]);
      }
    }

    cardCountModified[0][1] += jokerCount;

    let handValue = '';

    // check for five of a kind
    if(cardCountModified.length == 1) {
      handValue += '01';
    } else {
      handValue += '00';
    }

    if(cardCountModified.length == 2) {
      if(cardCountModified[0][1] == 4 || cardCountModified[1][1] == 4) {
        handValue += '2';
      } else {
        handValue += '1';
      }
    } else {
      handValue += '0';
    }

    if(cardCountModified.length == 3) {
      if(cardCountModified[0][1] == 3 || cardCountModified[1][1] == 3) {
        handValue += '2';
      }else {
        handValue += '1';
      }
    } else {
      handValue += '0';
    }

    if(cardCountModified.length == 4) {
      handValue += '1';
    } else {
      handValue += '0';
    }

    for(let j = 0; j < cards[i].length; j++) {
      handValue += cardMap.get(cards[i][j]);
    }

    handValueMap.set(cards[i], handValue);
  }

  const sortedHandValues = [...handValueMap.entries()].sort((a, b) => {
    const strA = a[1];
    const strB = b[1];

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });

  let result = 0;

  for(let i = 0; i < sortedHandValues.length; i++) {
    result += cardToBidMap.get(sortedHandValues[i][0]) * (i+1);
  }

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
