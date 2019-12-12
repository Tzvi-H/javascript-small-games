const READLINE = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

let prompt = message => console.log(`=> ${message}`);

let displayWinner = (userChoice, computerChoice) => {
  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);

  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')) {
      prompt('You win!');
  } else if ((userChoice === 'rock' && computerChoice === 'paper') ||
            (userChoice === 'paper' && computerChoice === 'scissors') ||
            (userChoice === 'scissors' && computerChoice === 'rock')) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie");
  }
};

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let userChoice = READLINE.question().toLowerCase();
  while (!VALID_CHOICES.includes(userChoice)) {
    prompt(`INVALID. Choose again (${VALID_CHOICES.join(', ')})`);
    userChoice = READLINE.question().toLowerCase();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(userChoice, computerChoice);

  prompt('Do you want to play again? (yes/y) (no/n)');
  let response = READLINE.question().toLowerCase();
  while (!['yes', 'y', 'no', 'n'].includes(response)) {
    prompt(`'${response}' is an invalid input. Try again (yes/y) (no/n)`);
    response = READLINE.question().toLowerCase();
  }
  if (['no', 'n'].includes(response)) break;
}