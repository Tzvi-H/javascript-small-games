// ask user to enter number1
// ask user to enter number2
// ask user to enter operation
// convert inputs to numbers
// based on what the operation is, operate
// on both numbers
// print the result

const readline = require('readline-sync');

console.log('Welcome to the Calculator!');

console.log("What's the first number?");
let number1 = readline.question();

console.log("What's the second number?");
let number2 = readline.question();

console.log('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide')
let operation = readline.question();

let output;

if (operation == '1') {
  output = Number(number1) + Number(number2);
} else if (operation == '2') {
  output = Number(number1) - Number(number2);
} else if (operation == '3') {
  output = Number(number1) * Number(number2);
} else if (operation == '4') {
  output = Number(number1) / Number(number2);
}

console.log(`The result is ${output}`);