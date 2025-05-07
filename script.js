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