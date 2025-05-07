const Gameboard = (() => {
  const board = Array(9).fill("");

  const getBoard = () => [...board];

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false
  }

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, placeMark, reset }
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer;
  let gameOver;

  const playTurn = (index) => {
    if (gameOver) return;

    if (Gameboard.placeMark(index, currentPlayer.mark)) {
      if(checkWin(currentPlayer.mark)) {
        gameOver = true;
        console.log(`${currentPlayer.name} wins!`);
      } else if (isFull()) {
        gameOver = true;
        console.log("It's a tie!");
      } else {
        switchPlayer();
      }
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (mark) => {
    const board = Gameboard.getBoard();

    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
      [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === mark)
    );
  };

  const isFull = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  const restart = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
  };

  return { playTurn, restart };
})();