const READLINE = require('readline-sync');
const PLAYER_NAME = 'Player';
const COMPUTER_NAME = 'Computer';
// FIRST_TURN can be PLAYER_NAME, COMPUTER_NAME, or 'choose'
// (all other values are treated like 'choose')
const FIRST_TURN = PLAYER_NAME;
const WINNING_SCORE = 2;
const EMPTY_MARKER = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const CENTER_SQUARE = '5';
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


function joinOr(array, delimiter = ', ', lastDelimiter = 'or') {
  if (array.length === 1) return array[0];
  array = array.slice();
  array[array.length - 1] = `${lastDelimiter} ${array[array.length - 1]}`;
  return array.length > 2 ? array.join(delimiter) : array.join(' ');
}

function createBoard() {
  let board = {};
  for (let square = 1; square <= 9; square += 1) {
    board[square] = EMPTY_MARKER;
  }
  return board;
}

function displayRules() {
  console.clear();
  console.log('Tic-Tac-Toe');
  console.log(`First to get 3 marks in a row wins the round`);
  console.log(`First to win ${WINNING_SCORE} rounds wins the game`);
  console.log(`\n${PLAYER_NAME} is ${PLAYER_MARKER} ${COMPUTER_NAME} is ${COMPUTER_MARKER}`);
}

function displayBoard(board) {
  displayRules();
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

function displayScore(playerScore, computerScore) {
  console.log(`${PLAYER_NAME}: ${playerScore}`);
  console.log(`${COMPUTER_NAME}: ${computerScore}\n`);
}

function emptySquares(board) {
  return Object
         .keys(board)
         .filter(square => board[square] === EMPTY_MARKER);
}

function promptPlayerForSquare(board) {
  let availableSquares = emptySquares(board);
  let square;
  while (true) {
    console.log(`Choose a square \n${joinOr(availableSquares)}`);
    square = READLINE.prompt();
    if (availableSquares.includes(square)) break;
    console.log(`\n'${square}' is an invalid square - Try again\n`);
  }
  board[square] = PLAYER_MARKER;
}

function emptySquareWith2SameMarkersInRow(board, marker) {
  let square;
  for (let idx = 0; idx < WINNING_LINES.length; idx += 1) {
    let line = WINNING_LINES[idx];
    square = line.find(sqr => {
      return (board[sqr] === EMPTY_MARKER) &&
             (line.filter(otherSqr => otherSqr !== sqr)
                .every(sqr => board[sqr] === marker));
    });
    if (square) break;
  }
  return square;
}

function winnableSquare(board) {
  // Check offense first (computer's marker), then defense (player's marker)
  let square = emptySquareWith2SameMarkersInRow(board, COMPUTER_MARKER) ||
               emptySquareWith2SameMarkersInRow(board, PLAYER_MARKER);

  if (square) return square;
  return null;
}

function randomSquare(board) {
  let availableSquares = emptySquares(board);
  let randomIndex = Math.floor(Math.random() * availableSquares.length);
  return availableSquares[randomIndex];
}

function computerChoosesSquare(board) {
  let offensiveOrDefensiveSquare = winnableSquare(board);
  if (offensiveOrDefensiveSquare) {
    board[offensiveOrDefensiveSquare] = COMPUTER_MARKER;
  } else if (board[CENTER_SQUARE] === EMPTY_MARKER) {
    board[CENTER_SQUARE] = COMPUTER_MARKER;
  } else {
    board[randomSquare(board)] = COMPUTER_MARKER;
  }
}

function isBoardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  let lineMarkers = WINNING_LINES.map(line => line.map(sq => board[sq]));
  if (
      lineMarkers.some(line => line.every(marker => marker === PLAYER_MARKER))
  ) {
    return PLAYER_NAME;
  } else if (
      lineMarkers.some(line => line.every(marker => marker === COMPUTER_MARKER))
  ) {
    return COMPUTER_NAME;
  }
  return null;
}

function newScores(playerScore, computerScore, winner) {
  if (winner === PLAYER_NAME) {
    playerScore += 1;
  } else if (winner === COMPUTER_NAME) {
    computerScore += 1;
  }
  return [playerScore, computerScore];
}

function chooseSquare(board, player) {
  if (player === PLAYER_NAME) {
    promptPlayerForSquare(board);
  } else if (player === COMPUTER_NAME) {
    computerChoosesSquare(board);
  }
}

function promptForFirstTurn() {
  let choice;
  console.clear();
  console.log('Welcome to Tic-Tac-Toe');
  while (true) {
    console.log('\nDo you want to go first? (yes/y) (no/n)');
    choice = READLINE.prompt();
    if (['yes', 'y', 'no', 'n'].includes(choice.toLowerCase())) break;
    console.log(`\n'${choice}' is invalid.`);
  }
  return choice[0] === 'y' ? PLAYER_NAME : COMPUTER_NAME;
}

function retrieveFirstTurn() {
  switch (FIRST_TURN) {
    case PLAYER_NAME: return PLAYER_NAME;
    case COMPUTER_NAME: return COMPUTER_NAME;
    default: return promptForFirstTurn();
  }
}

function alternateCurrentPlayer(currentPlayer) {
  return currentPlayer === PLAYER_NAME ?
         COMPUTER_NAME :
         PLAYER_NAME;
}

function playRound(playerScore, computerScore) {
  let board = createBoard();
  let currentPlayer = retrieveFirstTurn();
  while (true) {
    displayBoard(board);
    displayScore(playerScore, computerScore);
    chooseSquare(board, currentPlayer);
    if (someoneWon(board) || isBoardFull(board)) break;
    currentPlayer = alternateCurrentPlayer(currentPlayer);
  }
  displayBoard(board);
  return board;
}

function displayAndUpdateScores(playerScore, computerScore, board) {
  if (someoneWon(board)) {
    let winner = detectWinner(board);
    [playerScore, computerScore] = newScores(playerScore,
                                            computerScore,
                                            winner);
    console.log(`${winner} won!`);
  } else {
    console.log("It's a tie!");
  }
  READLINE.question('\nEnter any key to continue ');
  return [playerScore, computerScore];
}

function playRoundAndUpdateScores(playerScore, computerScore) {
  let board = playRound(playerScore, computerScore);
  [playerScore, computerScore] = displayAndUpdateScores(playerScore,
                                                        computerScore,
                                                        board);
  return [playerScore, computerScore];
}

function playMatch() {
  let playerScore = 0;
  let computerScore = 0;
  while (playerScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
    [playerScore, computerScore] = playRoundAndUpdateScores(playerScore,
                                                            computerScore);
  }
  console.log('\nGAME OVER');
  displayScore(playerScore, computerScore);
}

function promptGoAgainChoice() {
  let choice;
  while (true) {
    console.log('Do you want to play again? (yes/y) (no/n)');
    choice = READLINE.prompt();
    if (['yes', 'y', 'no', 'n'].includes(choice.toLowerCase())) break;
    console.log(`\n'${choice}' is invalid.\n`);
  }
  return choice.toLowerCase();
}

function goAgain() {
  return ['yes', 'y'].includes(promptGoAgainChoice());
}

do {
  playMatch();
} while (goAgain());

console.log('\nThanks for playing Tic Tac Toe!\nGood bye.');
