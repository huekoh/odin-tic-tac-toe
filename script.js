const GameBoard = (function () {
  // initialise game board
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // board functions
  const displayBoard = () => {
    console.log(board);
  };

  const setTile = (x, y, char) => {
    if (!board[y][x]) {
      board[y][x] = char;
    } else {
      throw new Error("This tile has already been claimed!");
    }
  };

  const checkWin = () => {
    // check for a diagonal winner
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return `Player ${board[0][0]} is the winner!`;
    }

    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return `Player ${board[0][0]} is the winner!`;
    }

    // check for a row winner
    for (row of board) {
      if (row[0] && row[0] === row[1] && row[0] === row[2]) {
        return `Player ${row[0]} is the winner!`;
      }
    }

    // check for a column winner
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return `Player ${board[0][i]} is the winner!`;
      }
    }

    return "There are no winners yet :(";
  };

  const resetBoard = () => {
    board.length = 0;
    for (let i = 0; i < 3; i++) {
      board.push([null, null, null]);
    }
  };

  return { board, displayBoard, setTile, checkWin };
})();

const Player = (function (name, char) {
  const playerName = name;
  const playerChar = char;

  const getPlayerChar = () => {
    return playerChar;
  };

  const getPlayerName = () => {
    return playerName;
  };

  return { getPlayerChar, getPlayerName };
})();

const Game = (function () {})();
