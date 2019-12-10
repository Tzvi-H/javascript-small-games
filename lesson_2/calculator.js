const messages = require('./calculator_messages.json');
const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || isNaN(Number(number));
}

prompt(messages.welcome);

while (true) {
  prompt(messages.number1);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages.invalidNumber);
    number1 = readline.question();
  }

  prompt(messages.number2);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages.invalidNumber);
    number2 = readline.question();
  }

  prompt(messages.operations);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages.invalidOperation);
    operation = readline.question();
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

  prompt(messages.goAgain);
  let answer = readline.question();
  if (answer[0].toLowerCase() !== 'y') break;
}
