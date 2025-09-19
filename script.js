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
  let currentPlayer = 0; // 0 for X, 1 for O
  let gameActive = true;

  const handleTileClick = (event) => {
    if (!gameActive) return;

    const tile = event.target;
    const x = parseInt(tile.dataset.x);
    const y = parseInt(tile.dataset.y);

    // Check if tile is already taken
    if (tile.textContent !== "") return;

    try {
      const char = currentPlayer === 0 ? "X" : "O";
      GameBoard.setTile(x, y, char);

      // Update HTML
      tile.textContent = char;
      tile.classList.add("disabled");

      // Check for win
      if (GameBoard.checkWin()) {
        gameActive = false;
        disableAllTiles();
      } else {
        // Switch players
        currentPlayer = currentPlayer === 0 ? 1 : 0;
      }

      GameBoard.displayBoard();
    } catch (error) {
      console.log(error.message);
    }
  };

  const disableAllTiles = () => {
    const tiles = document.querySelectorAll(".tiles");
    tiles.forEach((tile) => tile.classList.add("disabled"));
  };

  const initGame = () => {
    // Reset game state
    currentPlayer = 0;
    gameActive = true;
    GameBoard.resetBoard();

    // Add event listeners to tiles
    const boardTiles = document.querySelectorAll(".tiles");
    boardTiles.forEach((tile, index) => {
      // Set data attributes for position
      const x = index % 3;
      const y = Math.floor(index / 3);
      tile.dataset.x = x;
      tile.dataset.y = y;

      // Remove existing listeners and add new one
      tile.replaceWith(tile.cloneNode(true));
      const newTile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      newTile.addEventListener("click", handleTileClick);
    });
  };

  const resetGame = () => {
    initGame();
  };

  return { initGame, resetGame };
})();

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  Game.initGame();

  // Add reset button functionality if it exists
  const resetButton = document.querySelector("#reset-button");
  if (resetButton) {
    resetButton.addEventListener("click", Game.resetGame);
  }
});
