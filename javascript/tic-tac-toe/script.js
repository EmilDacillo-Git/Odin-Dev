const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, resetBoard };
})();

//player factory
const player = (name, mark) => {
  return { name, mark };
};

const gameController = (() => {
  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;

  const checkWinner = () => {
    const board = gameBoard.getBoard();
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        return currentPlayer;
      }
    }
    return null;
  };

  const checkTie = () => {
    const board = gameBoard.getBoard();
    return board.every((cell) => cell !== "");
  };

  const playMove = (index) => {
    if (gameOver) {
      return {status: "game-over"};
    }

    if (!Number.isInteger(index) || index < 0 || index > 8) {
      return { status: "invalid" };
    }

    if (gameBoard.setMark(index, currentPlayer.mark)) {
      const winner = checkWinner();
      if (winner) {
        return { status: "win", winner };
      }
      if (checkTie()) {
        return { status: "tie" };
      }
      switchPlayer();
      return { status: "continue" };
    }

    return { status: "invalid" };
  };

  const restartGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
  };

  return { playMove, getCurrentPlayer, restartGame, isGameOver };
})();

const displayModule = (() => {
  const tiles = document.querySelectorAll(".tile");
  const restartBtn = document.getElementById("restart-btn");
  const announcement = document.getElementById("announcement");

  const render = (message = null) => {
    const board = gameBoard.getBoard();
    tiles.forEach((tile, index) => {
      tile.textContent = board[index];
    });

    if (message) {
      announcement.textContent = message;
    } else {
      const currentPlayer = gameController.getCurrentPlayer();
      announcement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
    }
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      const result = gameController.playMove(index);

      if (!result || typeof result.status !== "string") {
        return;
      }

      const status = result.status.toLowerCase();

      if (result.status === "win") {
        render(`Winner: ${result.winner.name} (${result.winner.mark})`);
      } else if (result.status === "tie") {
        render("It's a tie!");
      } else if (result.status === "continue") {
        render();
      }else if (status === "invalid") {
        // optional UX: show brief notice then restore turn text
        announcement.textContent = "Square already taken!";
        setTimeout(() => render(), 600);
      } else if (status === "game-over") {
        // game already ended; ignore clicks but let user know
        announcement.textContent = "Game over. Press Reset to play again.";
      }

    });
  });

  restartBtn.addEventListener("click", () => {
    gameController.restartGame();
    render();
  });

  render();

  return { render };
})();
