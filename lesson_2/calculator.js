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

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages('invalidOperation'));
    operation = READLINE.question();
  }

  let output;
  switch (operation) {
    case '1': output = Number(number1) + Number(number2);
    break;
    case '2': output = Number(number1) - Number(number2);
    break;
    case '3': output = Number(number1) * Number(number2);
    break;
    case '4': output = Number(number1) / Number(number2);
  }

  prompt(`The result is ${output}`);

  prompt(messages('goAgain'));
  let answer = READLINE.question();
  if (answer[0].toLowerCase() !== 'y') break;
}