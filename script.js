const Gameboard = (() => {
  const board = Array(9).fill("");

  const getBoard = () => [...board];

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, placeMark, reset };
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
    if (gameOver) {
      return "The game is over. Click the restart button to play again :)";
    }

    if (Gameboard.placeMark(index, currentPlayer.mark)) {
      if (checkWin(currentPlayer.mark)) {
        gameOver = true;
        return `${currentPlayer.name} wins!`;
      }
      if (isFull()) {
        gameOver = true;
        return "It's a tie!";
      }

      switchPlayer();
      return `Player ${currentPlayer.mark}'s turn`;
    }

    return `Player ${currentPlayer.mark}'s turn`;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (mark) => {
    const board = Gameboard.getBoard();

    const winPatterns = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === mark)
    );
  };

  const isFull = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  const restart = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
  };

  return { playTurn, restart };
})();

const DisplayController = (() => {
  const messageDisplay = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.querySelector(".restart-btn");

  const renderBoard = () => {
    const board = Gameboard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const displayMessage = (msg) => {
    messageDisplay.textContent = msg;
  };

  const bindEvents = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = parseInt(cell.dataset.index);
        msg = GameController.playTurn(index);
        renderBoard();
        displayMessage(msg);
      });
    });

    restartButton.addEventListener("click", () => {
      GameController.restart();
      renderBoard();
      displayMessage("Player X's turn");
    });
  };

  return { renderBoard, displayMessage, bindEvents };
})();

GameController.restart();
DisplayController.bindEvents();
DisplayController.renderBoard();
DisplayController.displayMessage("Player X's turn");
