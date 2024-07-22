const gameBoard = (function () {
  const ticTacToeBoard = document.querySelector(".gameboard"); 
  // this has to go to the playGame module
  for (let i = 0; i < 9; i++) {
    let square = document.createElement("div");
    square.setAttribute("class", "square");
    square.setAttribute("id", `${i}`);
    // square.addEventListener("click", makeMove());
    ticTacToeBoard.appendChild(square);
  }
  let board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  
  const getBoard = () => board;
  
  const makeMove = (e, player) => { // player is the player's sign
    const boardIndex = e.getID;
    board[boardIndex] = player; 
  }
  
  const isMoveValid = (move) => {
    const row = move[0];
    const column = move[1];
    if (board[row][column] === null) {
      return true;
    }
    return false;
  }
  
  return { getBoard, getCoordinates, makeMove, isMoveValid };
})();

function player(sign) {
  return { sign };
}

const gameLogic = (function () {
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

  // win conditions
  const winConditions = () => {
    const board = gameBoard.getBoard();

    const rowsWin = (row) => {
      return board[row][0] !== null && board[row][0] === board[row][1] && board[row][0] === board[row][2];
    };

    const columnsWin = (column) => {
      return board[0][column] !== null && board[0][column] === board[1][column] && board[0][column] === board[2][column];
    };

    const diagonalsWin = () => {
      const firstDiagonal = [board[0][0], board[1][1], board[2][2]];
      const secondDiagonal = [board[0][2], board[1][1], board[2][0]];
      return (firstDiagonal[0] !== null && firstDiagonal[0] === firstDiagonal[1] && firstDiagonal[0] === firstDiagonal[2]) ||
             (secondDiagonal[0] !== null && secondDiagonal[0] === secondDiagonal[1] && secondDiagonal[0] === secondDiagonal[2]);
    };

    return { rowsWin, columnsWin, diagonalsWin };
  };
  
  return { increaseRound, getRound, switchPlayer, isGameOver, gameIsOver, getPlayer, winConditions };
})();

/** const playGame = (function () {
  while (!gameLogic.isGameOver()) {
    const move = gameBoard.getCoordinates();
    
    if (gameBoard.isMoveValid(move)) {
      const currentPlayer = gameLogic.getPlayer().sign;
      gameBoard.makeMove(move, currentPlayer);
      console.log(gameBoard.getBoard())
      const { rowsWin, columnsWin, diagonalsWin } = gameLogic.winConditions();

      for (let i = 0; i < 3; i++) {
        if (rowsWin(i) || columnsWin(i)) {
          console.log(`${currentPlayer} wins!`);
          gameLogic.gameIsOver();
          break;
        }
      }

      if (diagonalsWin()) {
        console.log(`${currentPlayer} wins!`);
        gameLogic.gameIsOver();
        break;
      }

      if (!gameLogic.isGameOver()) {
        if (gameLogic.getRound() === 9) {
          console.log("It's a tie!");
          gameLogic.gameIsOver();
          break;
        }
        gameLogic.increaseRound();
        gameLogic.switchPlayer();
      }
    } else {
      console.log("Invalid move, try again.");
    }
  }
})();**/
