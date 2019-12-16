const READLINE = require('readline-sync');
/* eslint-disable id-length */
const ABBREVIATIONS_TO_CHOICES = {
  r: 'rock',
  p: 'paper',
  sc: 'scissors',
  l: 'lizard',
  sp: 'spock'
};
/* eslint-enable id-length */

const VALID_INPUTS = Object.keys(ABBREVIATIONS_TO_CHOICES);
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};
const WINNING_SCORE = 3;

function prompt(message) {
  console.log(`=> ${message}`);
}

function clearScreen() {
  console.clear();
}

function displayWelcomeMessage() {
  prompt(`Welcome to "${Object.values(ABBREVIATIONS_TO_CHOICES).join(' ')}."`);
  prompt(`The first to score ${WINNING_SCORE} wins the game!\n`);
}

function displayRules() {
  prompt('Here are the rules');
  for (let move in WINNING_COMBOS) {
    console.log(`${move} beats ${WINNING_COMBOS[move].join(' and ')}`);
  }
  console.log('\n');
}

function displayChoices() {
  prompt('Enter your choice');
  for (let abbreviation in ABBREVIATIONS_TO_CHOICES) {
    console.log(`'${abbreviation}' for ${ABBREVIATIONS_TO_CHOICES[abbreviation]}`);
  }
}

function getValidInput() {
  displayChoices();
  let input = READLINE.question();
  while (!VALID_INPUTS.includes(input.toLowerCase())) {
    console.log('\n');
    prompt(`'${input}' is invalid`);
    displayChoices();
    input = READLINE.question();
  }
  return input;
}

function getComputerChoice() {
  let validChoices = Object.values(ABBREVIATIONS_TO_CHOICES);
  let randomIndex = Math.floor(Math.random() * validChoices.length);
  let randomChoice = validChoices[randomIndex];
  return randomChoice;
}

function detectWinner(userChoice, computerChoice) {
  let winner;
  if (WINNING_COMBOS[userChoice].includes(computerChoice)) {
    winner = 'user';
  } else if (WINNING_COMBOS[computerChoice].includes(userChoice)) {
    winner = 'computer';
  }
  return winner;
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
  console.log('\n');
}

function displayScore(userScore, computerScore) {
  prompt(`Score\nUser: ${userScore}\nComputer: ${computerScore}`);
  console.log('\n');
}

let userScore = 0;
let computerScore = 0;

clearScreen();
displayWelcomeMessage();
displayRules();

while ((userScore < WINNING_SCORE) && (computerScore < WINNING_SCORE)) {
  let input = getValidInput();
  let userChoice = ABBREVIATIONS_TO_CHOICES[input.toLowerCase()];
  let computerChoice = getComputerChoice();

  clearScreen();
  displayResults(userChoice, computerChoice);
  switch (detectWinner(userChoice, computerChoice)) {
    case 'user': userScore += 1;
          break;
    case 'computer': computerScore += 1;
          break;
  }
  displayScore(userScore, computerScore);

  if (userScore === WINNING_SCORE) {
    prompt(`You have ${WINNING_SCORE} wins. You win!`);
    break;
  } else if (computerScore === WINNING_SCORE) {
    prompt(`Computer has ${WINNING_SCORE} wins. You lose!`);
    break;
  }

  prompt("Enter 'q' to quit or any other key to continue");
  input = READLINE.question();
  if (input.toLowerCase() === 'q') break;
  clearScreen();
}

prompt('Thanks for playing.');
