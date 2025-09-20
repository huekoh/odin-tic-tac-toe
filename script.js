let playerTurn = 0;

// Page object handles page logic and DOM manipulations
const Page = (function () {
  // the tictactoe board
  const board = document.querySelectorAll(".tile");
  // start and reset buttons
  const buttons = document.querySelectorAll(".button");
  // player stats display
  const playerStats = document.querySelectorAll(".player-section");

  // board functions
  const setTile = (event) => {
    if (event.target.textContent) {
      console.log("This tile is already taken!!");
    } else if (!playerTurn) {
      event.target.textContent = "X";
      playerTurn--;
    } else {
      event.target.textContent = "O";
      playerTurn++;
    }
  };

  const clearBoard = () => {
    for (const tile of board) {
      tile.textContent = "";
    }
  };

  // button functions
  const displayStart = () => {
    for (section of playerStats) {
      section.style.display = "flex";
    }
  };

  // add event listeners
  for (const tile of board) {
    tile.addEventListener("click", setTile);
  }

  buttons[0].addEventListener("click", displayStart);
  buttons[1].addEventListener("click", clearBoard);

  return { board, setTile };
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

const Game = (function () {
  const start = () => {};

  const checkWin = () => {
    let message = "";
    let isWon = false;
    // check for a diagonal winner
    if (
      Page.board[0] &&
      Page.board[0] === Page.board[4] &&
      Page.board[0] === Page.board[8]
    ) {
      message = `Player ${Page.board[0].textContent} is the winner!`;
      isWon = true;
    }

    if (
      Page.board[2] &&
      Page.board[2] === Page.board[4] &&
      Page.board[2] === Page.board[6]
    ) {
      message = `Player ${Page.board[0].textContent} is the winner!`;
      isWon = true;
    }

    // check for a row winner
    for (let i = 0; i < 9; i += 3) {
      if (
        Page.board[i] &&
        Page.board[i] === Page.board[i + 1] &&
        Page.board[i] === Page.board[i + 2]
      ) {
        message = `Player ${Page.board[i].textContent} is the winner!`;
        isWon = true;
        break;
      }
    }

    // check for a column winner
    for (let i = 0; i < 3; i++) {
      if (
        Page.board[i] &&
        Page.board[i] === Page.board[i + 3] &&
        Page.board[i] === Page.board[i + 6]
      ) {
        message = `Player ${Page.board[i].textContent} is the winner!`;
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

  return { checkWin };
})();
