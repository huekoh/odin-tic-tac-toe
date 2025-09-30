// Game object handles game logic and data
const Game = (function () {
  let playerTurn = 0;
  let gameActive = false;

  const startRound = () => {
    playerTurn = 0;
    gameActive = true;
  };

  const makeMove = () => {
    const currentPlayer = playerTurn === 0 ? "X" : "O";
    playerTurn = playerTurn === 0 ? 1 : 0;
    return currentPlayer;
  };

  const checkWin = (boardState) => {
    let message = "";
    let isWon = false;

    // check for a diagonal winner
    if (
      boardState[0] &&
      boardState[0] === boardState[4] &&
      boardState[0] === boardState[8]
    ) {
      return { isWon: true, winner: boardState[0] };
    }

    if (
      boardState[2] &&
      boardState[2] === boardState[4] &&
      boardState[2] === boardState[6]
    ) {
      return { isWon: true, winner: boardState[2] };
    }

    // check for a row winner
    for (let i = 0; i < 9; i += 3) {
      if (
        boardState[i] &&
        boardState[i] === boardState[i + 1] &&
        boardState[i] === boardState[i + 2]
      ) {
        return { isWon: true, winner: boardState[i] };
      }
    }

    // check for a column winner
    for (let i = 0; i < 3; i++) {
      if (
        boardState[i] &&
        boardState[i] === boardState[i + 3] &&
        boardState[i] === boardState[i + 6]
      ) {
        return { isWon: true, winner: boardState[i] };
      }
    }

    // check for a tie
    if (boardState.every((cell) => cell !== "")) {
      return { isWon: false, winner: null, isTie: true };
    }

    return { isWon: false, winner: null, isTie: false };
  };

  return {
    startRound,
    makeMove,
    checkWin,
    isGameActive: () => gameActive,
  };
})();

// Page object handles page logic and DOM manipulations
const Page = (function () {
  let player1Score = 0;
  let player2Score = 0;
  let player1Name = "";
  let player2Name = "";

  const board = document.querySelectorAll(".tile");
  const winPopup = document.querySelector(".winner-popup");
  const winnerText = winPopup.querySelector("h2");
  const buttons = document.querySelectorAll(".button");
  const playerStats = document.querySelectorAll(".player-section");
  const form = document.querySelector(".form-popup");

  // tile board functions and events
  const updateScores = () => {
    playerStats[0].querySelector(
      "h2"
    ).textContent = `${player1Name.toUpperCase()}: ${player1Score}`;
    playerStats[1].querySelector(
      "h2"
    ).textContent = `${player2Name.toUpperCase()}: ${player2Score}`;
  };

  const setTile = (event) => {
    if (!Game.isGameActive()) {
      console.log("Game has not started.");
      return;
    }
    if (event.target.textContent) {
      console.log("This tile is already taken!!");
      return;
    }

    const player = Game.makeMove();
    event.target.textContent = player;

    const boardState = Array.from(board).map((tile) => tile.textContent);
    const result = Game.checkWin(boardState);

    if (result.isWon) {
      console.log(`Player ${result.winner} wins!`);

      if (result.winner === "X") {
        player1Score++;
        winnerText.textContent = `${player1Name.toUpperCase()} WINS!`;
      } else {
        player2Score++;
        winnerText.textContent = `${player2Name.toUpperCase()} WINS!`;
      }

      updateScores();
      winPopup.style.display = "flex";
    } else if (result.isTie) {
      winnerText.textContent = "IT'S A TIE!";
      winPopup.style.display = "flex";
    }
  };

  for (const tile of board) {
    tile.addEventListener("click", setTile);
  }

  // button functions and events
  // start game button
  buttons[1].addEventListener("click", () => {
    if (Game.isGameActive()) {
      console.log("A game is currently active.");
      return;
    }
    form.style.display = "flex";
  });
  // new round button
  buttons[0].addEventListener("click", () => {
    for (const tile of board) {
      tile.textContent = "";
    }
    winPopup.style.display = "none";
    Game.startRound();
  });

  // end game button
  buttons[2].addEventListener("click", () => {
    window.location.href = window.location.href;
  });

  // form functions and events
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the input values
    player1Name = document.getElementById("player-x").value;
    player2Name = document.getElementById("player-o").value;

    // Update the h2 elements in player sections
    playerStats[0].querySelector(
      "h2"
    ).textContent = `${player1Name.toUpperCase()}: 0`;
    playerStats[1].querySelector(
      "h2"
    ).textContent = `${player2Name.toUpperCase()}: 0`;

    for (const section of playerStats) {
      section.style.visibility = "visible";
    }

    form.style.display = "none";
    Game.startRound();
  });
})();
