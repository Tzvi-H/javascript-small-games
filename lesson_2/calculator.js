const READLINE = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'en'; // 'en' for English, 'iw' for Hebrew

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, lang = LANGUAGE) {
  return MESSAGES[lang][message];
}

function invalidNumber(number) {
  return Number.isNaN(Number(number)) || number.trimStart() === '';
}

prompt(messages('welcome'));

while (true) {
  prompt(messages('number1Prompt'));
  let number1 = READLINE.question();

  while (invalidNumber(number1)) {
    prompt(messages('invalidNumber'));
    number1 = READLINE.question();
  }

  prompt(messages('number2Prompt'));
  let number2 = READLINE.question();

  while (invalidNumber(number2)) {
    prompt(messages('invalidNumber'));
    number2 = READLINE.question();
  }

  prompt(messages('operations'));
  let operation = READLINE.question();
  let output;

  while (true) {
    let invalidInput = false;

    switch (operation) {
      case '1': output = Number(number1) + Number(number2);
                break;
      case '2': output = Number(number1) - Number(number2);
                break;
      case '3': output = Number(number1) * Number(number2);
                break;
      case '4': output = Number(number1) / Number(number2);
                break;
      default : invalidInput = true;
    }

    if (invalidInput) {
      prompt(messages('invalidOperation'));
      operation = READLINE.question();
    } else {
      break;
    }
  }

  prompt(`The result is ${output}`);

  prompt(messages('goAgain'));
  let answer = READLINE.question().toLowerCase();
  while (!['yes', 'y', 'no', 'n'].includes(answer)) {
    prompt(messages('invalidResponse'));
    answer = READLINE.question().toLowerCase();
  }
  if (['no', 'n'].includes(answer)) break;
}