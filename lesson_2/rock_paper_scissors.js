const READLINE = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};

function lineBreak() {
  console.log();
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayRules() {
  for (let move in WINNING_COMBOS) {
    console.log(`${move} wins over: ${WINNING_COMBOS[move].join(' and ')}`);
  }
}

function displayChoices() {
  VALID_CHOICES.forEach((choice, index) => console.log(`${index + 1}: ${choice}`));
}

function invalidNumberChoice(numberChoice) {
  return (numberChoice <= 0) ||
         (numberChoice > VALID_CHOICES.length) ||
         (!Number.isInteger(numberChoice));
}

function displayWinner(userChoice, computerChoice) {
  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);

  if (WINNING_COMBOS[userChoice].includes(computerChoice)) {
      prompt('You win!');
  } else if (WINNING_COMBOS[computerChoice].includes(userChoice)) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie");
  }
}

prompt(`Welcome to ${VALID_CHOICES.join(' ')}.`);
lineBreak();
displayRules();

// loop exits when goAgainResponse matches
// the right criteria in the while statement
let goAgainResponse;
do {
  lineBreak();
  prompt('Enter a number');
  displayChoices();

  let numberChoice = Number(READLINE.question());
  while (invalidNumberChoice(numberChoice)) {
    prompt('Please enter a valid number');
    displayChoices();
    numberChoice = Number(READLINE.question());
  }
  let userChoice = VALID_CHOICES[numberChoice - 1];

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(userChoice, computerChoice);

  lineBreak();

  prompt('Do you want to play again? (yes/y) (no/n)');
  goAgainResponse = READLINE.question().toLowerCase();
  while (!['yes', 'y', 'no', 'n'].includes(goAgainResponse)) {
    prompt(`'${goAgainResponse}' is an invalid input. Try again (yes/y) (no/n)`);
    goAgainResponse = READLINE.question().toLowerCase();
  }
} while (['yes', 'y'].includes(goAgainResponse));
