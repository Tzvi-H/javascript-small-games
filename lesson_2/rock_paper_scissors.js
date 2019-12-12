const READLINE = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

let prompt = message => console.log(`=> ${message}`);

prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
let choice = READLINE.question().toLowerCase();

while (!VALID_CHOICES.includes(choice)) {
  prompt(`INVALID. Choose again (${VALID_CHOICES.join(', ')})`);
  choice = READLINE.question().toLowerCase();
}

let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];

prompt(`You chose ${choice}, computer chose ${computerChoice}`);