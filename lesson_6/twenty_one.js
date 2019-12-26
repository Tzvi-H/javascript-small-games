const READLINE = require('readline-sync');
const GAME_VALUE = 21;
const MAX_SCORE = 3;
const DEALER_STOP_VALUE = 17;
const DEALER_NAME = 'Dealer';
const PLAYER_NAME = 'Player';
const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const RANKS = [ '2', '3', '4', '5', '6', '7', '8', '9', '10',
                'Jack', 'Queen', 'King', 'Ace' ];
const RANK_VALUES = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,10: 10,
                      Jack: 10, Queen: 10, King: 10, Ace: 11 };

function displayWelcomeMsg() {
  console.clear();
  console.log(`Welcome to ${GAME_VALUE}!\nFirst to score ${MAX_SCORE}, wins the game\n`);
}

function displayGoodbyeMsg() {
  console.log(`\nThanks for playing ${GAME_VALUE}`);
}

function createDeck() {
  let deck = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({suit: suit, rank: rank});
    });
  });
  return shuffleDeck(deck);
}

function shuffleDeck(deck) {
  for (let idx = deck.length - 1; idx > 0; idx -= 1) {
    let randomIndex = Math.floor(Math.random() * (idx + 1));
    [deck[idx], deck[randomIndex]] = [deck[randomIndex], deck[idx]];
  }
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

function addCardToHand(hand, deck) {
  hand.push(dealCard(deck));
}

function cardValue(card) {
  return RANK_VALUES[card.rank];
}

function handValue(hand) {
  let value =  hand.reduce((sum, card) => sum + cardValue(card), 0);
  value = adjustAceValues(value, hand);
  return value;
}

function acesQty(hand) {
  return hand.filter(card => card.rank === 'Ace').length;
}

function adjustAceValues(value, hand) {
  let aces = acesQty(hand);
  while (value > GAME_VALUE && aces >= 1) {
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

function displayLastCard(hand, name) {
  let lastCard = cardInfo(hand[hand.length - 1]);
  console.log(`${name} is dealt the ${lastCard}\n`);
}

function displayBothHands(playerHand, dealerHand) {
  displayFullCards(playerHand, PLAYER_NAME);
  displayFullCards(dealerHand, DEALER_NAME);
}

function promptHitOrStay() {
  console.log('\nHit(h) or Stay(s)?');
  let input = retrieveValidInput(['hit', 'h', 'stay', 's']);
  console.log();
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

function busted(hand) {
  return handValue(hand) > GAME_VALUE;
}

function playerTurn(playerHand, dealerHand, deck) {
  while (true) {
    displayFullCards(playerHand, PLAYER_NAME);
    displayPartialCards(dealerHand, DEALER_NAME);
    if (promptHitOrStay()) break;
    addCardToHand(playerHand, deck);
    displayLastCard(playerHand, PLAYER_NAME);
    if (busted(playerHand)) break;
  }
}

function dealerTurn(playerHand, dealerHand, deck) {
  if (!busted(playerHand)) {
    while (handValue(dealerHand) < DEALER_STOP_VALUE) {
      addCardToHand(dealerHand, deck);
    }
  }
}

function calculateResult(playerHand, dealerHand) {
  if (busted(playerHand)) {
    return `${PLAYER_NAME} busted`;
  } else if (busted(dealerHand)) {
    return `${DEALER_NAME} busted`;
  } else if (handValue(playerHand) > handValue(dealerHand)) {
    return `${PLAYER_NAME} wins`;
  } else if (handValue(dealerHand) > handValue(playerHand)) {
    return `${DEALER_NAME} wins`;
  } else {
    return 'tie';
  }
}

function updateScore(playerScore, dealerScore, result) {
  if (result === `${DEALER_NAME} busted` || result === `${PLAYER_NAME} wins`) {
    playerScore += 1;
  } else if (result === `${PLAYER_NAME} busted` || result === `${DEALER_NAME} wins`) {
    dealerScore += 1;
  }
  return [playerScore, dealerScore];
}

function displayResult(playerHand, dealerHand, result) {
  if (result === 'tie') {
    console.log("It's a tie!\n");
  } else {
    console.log(`${result}!\n`);
  }
  displayBothHands(playerHand, dealerHand);
  console.log();
}

function displayScore(playerScore, dealerScore) {
  console.log(`${PLAYER_NAME} Score: ${playerScore}`);
  console.log(`${DEALER_NAME} score: ${dealerScore}\n`);
}

function displayWinner(playerScore, dealerScore) {
  displayScore(playerScore, dealerScore);
  if (playerScore > dealerScore) {
    console.log(`${PLAYER_NAME} wins!`);
  } else {
    console.log(`${DEALER_NAME} wins!`);
  }
}

function playAgain() {
  console.log('\nWould you like to play again? yes(y) no(n)');
  let input = retrieveValidInput(['yes', 'y', 'no', 'n']);
  return ['yes', 'y'].includes(input.toLowerCase());
}

do {
  displayWelcomeMsg();
  let playerScore = 0;
  let dealerScore = 0;

  while (playerScore < MAX_SCORE && dealerScore < MAX_SCORE) {
    displayScore(playerScore, dealerScore);
    let deck = createDeck();
    let playerHand = dealCards(deck, 2);
    let dealerHand = dealCards(deck, 2);

    playerTurn(playerHand, dealerHand, deck);
    dealerTurn(playerHand, dealerHand, deck);
    let result = calculateResult(playerHand, dealerHand);
    [playerScore, dealerScore] = updateScore(playerScore, dealerScore, result);
    displayResult(playerHand, dealerHand, result);
    displayScore(playerScore, dealerScore);
    READLINE.question('Hit the Enter key to continue\n');
    console.clear();
  }
  displayWinner(playerScore, dealerScore);
} while (playAgain());

displayGoodbyeMsg();
