# TicTacToe Whamsy 🎮

A simple two-player Tic Tac Toe game built with **HTML, CSS, and JavaScript**.  
Players can enter their names, take turns marking the board, and track scores across multiple rounds.

---

## Features ✨
- **Player name input** – customize Player X and Player O before starting.
- **Dynamic game board** – click tiles to make moves.
- **Win & tie detection** – announces the result instantly.
- **Score tracking** – keeps count of wins for each player.
- **New round / End game** options – restart the board or fully reset the session.
- **Responsive UI** – styled with CSS grid and custom themes.

---

## Getting Started 🚀
1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
3. Open `index.html` in your browser.
4. Enter player names and press **Start Game**.
5. Play until someone wins (or ties)!  
   - Click **New Round** to clear the board.  
   - Click **End Game** to reset everything.

---

## Project Structure 📂
``` plaintext
.
├── index.html        # Main HTML file containing the game layout and UI elements
├── styles.css        # Stylesheet for layout, colors, and board design
├── script.js         # JavaScript handling game logic and DOM interactions
├── package.json      # Project metadata and dependencies
└── package-lock.json # Auto-generated dependency lock file
```

---

## How It Works ⚙️
- **Game Module (`script.js`)**
  - Handles turns, win/tie logic, and game state.
- **Page Module (`script.js`)**
  - Updates the DOM, displays popups, and manages scores.
- **Styling (`styles.css`)**
  - CSS grid layout for the board and clean responsive visuals.

---

## Future Improvements 🛠
- Add single-player mode with AI.
- Improve mobile responsiveness.
- Animate tile clicks and win highlights.

---

## License 📜
This project is free to use for learning and fun.  
