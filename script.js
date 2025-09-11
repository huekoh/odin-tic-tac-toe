const prompt = require("prompt-sync")({ sigint: true });

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
    let message = "";
    let isWon = false;
    // check for a diagonal winner
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      message = `Player ${board[0][0]} is the winner!`;
      isWon = true;
    }

    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      message = `Player ${board[0][0]} is the winner!`;
      isWon = true;
    }

    // check for a row winner
    for (row of board) {
      if (row[0] && row[0] === row[1] && row[0] === row[2]) {
        message = `Player ${row[0]} is the winner!`;
        isWon = true;
        break;
      }
    }

    // check for a column winner
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        message = `Player ${board[0][i]} is the winner!`;
        isWon = true;
        break;
      }
    }

    if (!isWon) {
      message = "There are no winners yet :(";
    }

    console.log(message);
    return isWon;
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

const Game = (function () {
  const playRound = () => {
    let playerTurn = 0;
    while (!GameBoard.checkWin()) {
      let tileY = prompt("Which row (0-2) do you want to mark?:");
      let tileX = prompt("Which column (0-2) do you want to mark?:");
      if (!playerTurn) {
        GameBoard.setTile(tileX, tileY, "X");
        playerTurn++;
      } else {
        GameBoard.setTile(tileX, tileY, "O");
        playerTurn--;
      }
      GameBoard.displayBoard();
    }
  };

  return { playRound };
})();

Game.playRound();
