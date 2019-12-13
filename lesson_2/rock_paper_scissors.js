/* eslint-disable id-length */
const READLINE = require('readline-sync');
const CHOICES = {
  r: 'rock',
  p: 'paper',
  sc: 'scissors',
  l: 'lizard',
  sp: 'spock'
};
const VALID_INPUTS = Object.keys(CHOICES);
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};
const WINNING_SCORE = 2;

function prompt(message) {
  console.log(`=> ${message}`);
}

function clearScreen() {
  console.clear();
}

function lineBreak() {
  console.log();
}

function displayWelcomeMessage() {
  prompt(`Welcome to "${Object.values(CHOICES).join(' ')}."`);
  prompt(`The first to score ${WINNING_SCORE} wins the game!`);
}

function displayRules() {
  prompt('Here are the rules');
  for (let move in WINNING_COMBOS) {
    console.log(`${move} beats ${WINNING_COMBOS[move].join(' and ')}`);
  }
}

function displayChoices() {
  prompt('Enter your choice');
  for (let abbreviation in CHOICES) {
    console.log(`'${abbreviation}' for ${CHOICES[abbreviation]}`);
  }
}

function getComputerChoice() {
  let validChoices = Object.values(CHOICES);
  let randomIndex = Math.floor(Math.random() * validChoices.length);
  let randomChoice = validChoices[randomIndex];
  return randomChoice;
}

function userWins(userChoice, computerChoice) {
  return WINNING_COMBOS[userChoice].includes(computerChoice);
}

function computerWins(computerChoice, userChoice) {
  return WINNING_COMBOS[computerChoice].includes(userChoice);
}

function displayResults(userChoice, computerChoice) {
  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);

  if (WINNING_COMBOS[userChoice].includes(computerChoice)) {
      prompt('You win!');
  } else if (WINNING_COMBOS[computerChoice].includes(userChoice)) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie");
  }
}

function displayScore(userScore, computerScore) {
  prompt(`Score\nUser: ${userScore}\nComputer: ${computerScore}`);
}

clearScreen();
displayWelcomeMessage();
lineBreak();
displayRules();
lineBreak();

let userScore = 0;
let computerScore = 0;

while ((userScore < WINNING_SCORE) && (computerScore < WINNING_SCORE)) {
  displayChoices();

  let input = READLINE.question();
  while (!VALID_INPUTS.includes(input.toLowerCase())) {
    lineBreak();
    prompt(`'${input}' is invalid`);
    displayChoices();
    input = READLINE.question();
  }

  let userChoice = CHOICES[input.toLowerCase()];
  let computerChoice = getComputerChoice();

  if (userWins(userChoice, computerChoice)) {
    userScore += 1;
  } else if (computerWins(computerChoice, userChoice)) {
    computerScore += 1;
  }

  clearScreen();
  displayResults(userChoice, computerChoice);
  lineBreak();
  displayScore(userScore, computerScore);

  if (userScore === WINNING_SCORE) {
    prompt('User wins!\nThanks for playing!');
    break;
  } else if (computerScore === 5) {
    prompt('Computer wins!\nThanks for playing!');
    break;
  }

  lineBreak();
  prompt("Enter 'q' to quit or any other key to continue");
  input = READLINE.question();
  if (input.toLowerCase() === 'q') break;
  clearScreen();
}
