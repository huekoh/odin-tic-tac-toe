let playerTurn = 0;

const GameBoard = (function () {
  // board functions
  const setTile = (event) => {
    if (playerTurn) {
      event.target.textContent = "X";
      playerTurn--;
    } else {
      event.target.textContent = "O";
      playerTurn++;
    }
  };

  const checkWin = () => {
    let message = "";
    let isWon = false;
    // check for a diagonal winner
    if (board[0] && board[0] === board[4] && board[0] === board[8]) {
      message = `Player ${board[0].textContent} is the winner!`;
      isWon = true;
    }

    if (board[2] && board[2] === board[4] && board[2] === board[6]) {
      message = `Player ${board[0].textContent} is the winner!`;
      isWon = true;
    }

    // check for a row winner
    for (let i = 0; i < 9; i += 3) {
      if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2]) {
        message = `Player ${board[i].textContent} is the winner!`;
        isWon = true;
        break;
      }
    }

    // check for a column winner
    for (let i = 0; i < 3; i++) {
      if (board[i] && board[i] === board[i + 3] && board[i] === board[i + 6]) {
        message = `Player ${board[i].textContent} is the winner!`;
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

  // retrieve all tiles on tictactoe board and add event listener
  const board = document.querySelectorAll(".tile");
  for (const tile of board) {
    tile.addEventListener("click", setTile);
  }

  return { board, setTile, checkWin };
})();

/* const Player = (function (name, char) {
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
*/

/* const Game = (function () {
  const playRound = () => {
    playerTurn = 0;

    while (!GameBoard.checkWin()) {
      if (!playerTurn) {
        GameBoard.setTile(tileX, tileY, "X");
        playerTurn++;
      } else {
        GameBoard.setTile(tileX, tileY, "O");
        playerTurn--;
      }
    }
  };

  return { playRound };
})();

Game.playRound();
*/
