const READLINE = require('readline-sync');
const WELCOME_MESSAGE = 'Welcome to Tic-Tac-Toe';
const EMPTY_MARKER = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'],
  ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'],
  ['1', '5', '8'], ['3', '5', '7']
]

function clearScreen() {
  console.clear();
}

function displayWelcome() {
  clearScreen();
  console.log(WELCOME_MESSAGE);
}

function createBoard() {
  let board = {};
  for (let square = 1; square <= 9; square += 1) {
    board[square] = EMPTY_MARKER;
  }
  return board;
}

function displayBoard(board) {
  console.log();
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----|-----|-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     | ');
  console.log();
}

function emptySquares(board) {
  return Object
         .keys(board)
         .filter(square => board[square] === EMPTY_MARKER);
}

function playerChoosesSquare(board) {
  let availableSquares = emptySquares(board);
  let square;
  while (true) {
    console.log(`Choose a square \n${availableSquares.join(', ')}`);
    square = READLINE.prompt();
    if (availableSquares.includes(square)) break;

    clearScreen();
    console.log(`'${square}' is an invalid square - Try again`);
    displayBoard(board);
  }
  board[square] = PLAYER_MARKER;
}

function computerChoosesSquare(board) {
  let availableSquares = emptySquares(board);
  let randomIndex = Math.floor(Math.random() * availableSquares.length);
  let square = availableSquares[randomIndex];
  board[square] = COMPUTER_MARKER;
  clearScreen();
}

function full(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  let temp = WINNING_LINES.map(line => line.map(square => board[square]));
  if (temp.some(line => line.every(square => square === PLAYER_MARKER))) {
       return 'Player';
     } else if (temp.some(
              line => line.every(square => square === COMPUTER_MARKER)
     )) {
       return 'Computer';
     }
   return false;
}

let board = createBoard();
displayWelcome();
displayBoard(board);

while (true) {
  playerChoosesSquare(board);
  if (someoneWon(board) || full(board)) break;
  computerChoosesSquare(board);
  if (someoneWon(board)) break;
  displayBoard(board);
}

clearScreen();
displayBoard(board);

if (someoneWon(board)) {
  console.log(`${detectWinner(board)} won!`)
} else {
  console.log("It's a tie!");
}
