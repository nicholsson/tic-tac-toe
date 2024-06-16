const gameBoard = (function () {
  let board = [[null, null, null], [null, null, null], [null, null, null]];
  const getBoard = () => board;
  const getCoordinates = () => {
    const userInput = prompt('Insert row and columns (from 0 to 2), separated by a space: ').split(" ");
    const coordinates = userInput.map(Number); //this will be a list of two integer; eg.--> coordinates = [0, 2]
    return coordinates; 
  }
  const makeMove = (coordinates, player) => { //player is the player's sign
    row = coordinates[0];
    column = coordinates[1];
    board[row][column] = player; 
  }
  return { getBoard, getCoordinates, makeMove };
})();
function player (sign) {
  return { sign };
}
const gameLogic = (function () {
  // first round start:
  let round = 1;
  const increaseRound = () => round++;
  const getRound = () => round;

  const playerOne = player('X');
  const playerTwo = player('O');
  let currentPlayer = playerOne;
  const switchPlayer = () => currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  const getPlayer = () => currentPlayer;

  let gameOver = false;
  const isGameOver = () => gameOver;
  const gameIsOver = () => gameOver = true;
  
  return { increaseRound, getRound, switchPlayer, isGameOver, gameIsOver, getPlayer }
})();
const playGame = (function () {
  while (!gameLogic.isGameOver()) {
    const move = gameBoard.getCoordinates();
    const currentPlayer = gameLogic.getPlayer().sign;
    gameBoard.makeMove(move, currentPlayer);
    if (gameLogic.getRound() > 2 && gameLogic.getRound() < 9) {
      // scan the board and check for winning conditions

      // if (gameLogic.isGameOver()) {return gameLogic.gameIsOver()}
      gameLogic.increaseRound();
    }
  }
})();
