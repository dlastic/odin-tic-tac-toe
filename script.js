const Gameboard = (() => {
  const board = Array(9).fill("");

  const getBoard = () => [...board];

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] === mark;
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

  const playTurn = (index) => {};

  const switchPlayer = () => {};

  const checkWin = (mark) => {};

  const isTie = () => {};

  const restart = () => {};

  return { playTurn, restart };
})();