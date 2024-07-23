const gameBoard = (function () {
  let board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  
  const getBoard = () => board;
  
  const handleMove = (e) => { // player is the player's sign
    const boardIndex = Number(e.target.id);
    const sign = gameLogic.getPlayer().sign;
    board[boardIndex] = sign;
    e.target.textContent = sign;
    if (!gameLogic.isGameOver()){
      if (gameLogic.winConditions()){
        gameLogic.gameIsOver();
        gameLogic.stopGame();
      } else {
        gameLogic.switchPlayer();
      }
    }
    e.target.removeEventListener("click", handleMove);
  }
  return { getBoard, handleMove };
})();

function player(sign) {
  return { sign };
}

const gameLogic = (function () {

  const playerOne = player('X');
  const playerTwo = player('O');
  let currentPlayer = playerOne;
  
  const switchPlayer = () => currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  const getPlayer = () => currentPlayer;

  let gameOver = false;
  
  const isGameOver = () => gameOver;
  const gameIsOver = () => gameOver = true;
  const stopGame = () => {
    document.querySelectorAll(".square").forEach(square => {
      square.removeEventListener("click", gameBoard.handleMove);
    });
  }
  // win conditions
  const winConditions = () => {
    const board = gameBoard.getBoard();
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],//rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],//columns
      [0, 4, 8], [2, 4, 6]//diagonals
    ]

    return winCombos.some(combo => {
      const [a, b, c] = combo;
      return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
  };
  
  return { switchPlayer, isGameOver, gameIsOver, stopGame, getPlayer, winConditions };
})();

const playGame = (function () {
  const ticTacToeBoard = document.querySelector(".gameboard"); 
  const speaker = document.querySelector(".speaker");
  speaker.textContent = "It's X's turn";
  for (let i = 0; i < 9; i++) {
    let square = document.createElement("div");
    square.setAttribute("class", "square");
    square.setAttribute("id", `${i}`);
    ticTacToeBoard.appendChild(square);
    square.addEventListener("click", gameBoard.handleMove);
  }
})();
