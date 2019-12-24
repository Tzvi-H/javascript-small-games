const READLINE = require('readline-sync');
const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const RANKS = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'Jack', 'Queen', 'King', 'Ace'
];
const RANK_VALUES = {
  2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,10: 10, 
  Jack: 10, Queen: 10, King: 10, Ace: 11
};
const DEALER_NAME = 'Dealer';
const PLAYER_NAME = 'Player';

function createDeck() {
  let deck = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({suit: suit, rank: rank});
    });
  });
  return deck;
}

function dealCard(deck) {
  return deck.pop();
}

function dealCards(deck, dealCount) {
  let cards = [];
  for (let count = 1; count <= dealCount; count += 1) {
    cards.push(dealCard(deck));
  }
  return cards;
}

function cardValue(card) {
  return RANK_VALUES[card.rank];
}

function handValue(hand) {
  let value =  hand.reduce((sum, card) => sum + cardValue(card), 0);
  value = deductAces(value, hand);
  return value;
}

function aceCount(hand) {
  return hand.filter(card => card.rank === 'Ace').length;
}

function deductAces(value, hand) {
  let aces = aceCount(hand);
  while (value > 21 && aces >= 1) {
    value -= 10;
    aces -= 1;
  }
  return value;
}

function cardInfo(card) {
  return `${card.rank} of ${card.suit}`;
}

function displayFullCards(hand, name) {
  let cards = hand.map(card => `[${cardInfo(card)}]`).join(' ');
  let value = handValue(hand);
  console.log(`${name} cards: ${cards} (${value})`);
}

function displayPartialCards(hand, name) {
  let card = cardInfo(hand[0]);
  console.log(`${name} cards: [${card}] [? of ?] (?)`);
}

function promptStay() {
  console.log('\nHit(h) or Stay(s)?');
  let input = retrieveValidInput(['hit', 'h', 'stay', 's']);
  return ['stay', 's'].includes(input.toLowerCase());
}

function retrieveValidInput(validInputs) {
  let input = READLINE.prompt();
  while (!validInputs.includes(input.toLowerCase())) {
    console.log(`'${input}' is Invalid. Enter a valid input`);
    input = READLINE.prompt();
  }
  return input;
}

function displayLastCard(hand, name) {
  let lastCard = cardInfo(hand[hand.length - 1]);
  console.log(`${name} was dealt the ${lastCard}\n`);
}

function busted(hand) {
  return handValue(hand) > 21;
}

function dealToPlayer(deck, hand) {
  hand.push(dealCard(deck));
  console.clear();
  displayLastCard(hand, PLAYER_NAME);
}

function shuffleDeck(deck) {
  for (let idx = deck.length - 1; idx > 0; idx -= 1) {
    let randomIndex = Math.floor(Math.random() * (idx + 1));
    [deck[idx], deck[randomIndex]] = [deck[randomIndex], deck[idx]];
  }
}

let deck = createDeck();
shuffleDeck(deck);

let playerHand = dealCards(deck, 2);
let dealerHand = dealCards(deck, 2);

console.clear();
console.log('Welcome to 21!\n');

do {
  displayFullCards(playerHand, PLAYER_NAME);
  displayPartialCards(dealerHand, DEALER_NAME);
  if (promptStay()) break;
  dealToPlayer(deck, playerHand);
} while (!busted(playerHand));
