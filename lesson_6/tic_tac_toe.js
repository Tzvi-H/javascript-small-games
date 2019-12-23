const READLINE = require('readline-sync');
const EMPTY_MARKER = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_COLUMNS = [
  ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9']
];
const WINNING_ROWS = [
  ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']
];
const WINNING_DIAGONALS = [
  ['1', '5', '9'], ['3', '5', '7']
];
const WINNING_LINES = [
  ...WINNING_COLUMNS,
  ...WINNING_ROWS,
  ...WINNING_DIAGONALS
];

function createBoard() {
  let board = {};
  for (let square = 1; square <= 9; square += 1) {
    board[square] = EMPTY_MARKER;
  }
  return board;
}

function displayBoard(board) {
  console.clear();
  console.log(`Your are ${PLAYER_MARKER}. Computer is ${COMPUTER_MARKER}`);
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
    console.log(`\n'${square}' is an invalid square - Try again\n`);
  }
  board[square] = PLAYER_MARKER;
}

function computerChoosesSquare(board) {
  let availableSquares = emptySquares(board);
  let randomIndex = Math.floor(Math.random() * availableSquares.length);
  let square = availableSquares[randomIndex];
  board[square] = COMPUTER_MARKER;
  console.clear();
}

function isItFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  let markers = WINNING_LINES.map(line => line.map(square => board[square]));
  if (
      markers.some(line => line.every(square => square === PLAYER_MARKER))
  ) {
    return 'Player';
  } else if (
      markers.some(line => line.every(square => square === COMPUTER_MARKER))
  ) {
    return 'Computer';
  }
  return null;
}

function retrievePlayAgainChoice() {
  let choice;
  while (true) {
    console.log('Do you want to play again? (yes/y) (no/n)');
    choice = READLINE.prompt();
    if (['yes', 'y', 'no', 'n'].includes(choice.toLowerCase())) break;
    console.log(`\n'${choice}' is invalid.\n`);
  }
  return choice.toLowerCase();
}

let playAgain;
do {
  let board = createBoard();
  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || isItFull(board)) break;

    computerChoosesSquare(board);
    if (someoneWon(board)) break;
  }

  displayBoard(board);
  if (someoneWon(board)) {
    console.log(`${detectWinner(board)} won!`);
  } else {
    console.log("It's a tie!");
  }

  playAgain = retrievePlayAgainChoice();
} while (['yes', 'y'].includes(playAgain));

console.log('\nGood bye.\nThanks for playing Tic Tac Toe!');