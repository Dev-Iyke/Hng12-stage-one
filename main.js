document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  const startBtn = document.getElementById("start-game-btn");
  const newGameBtn = document.getElementById("new-game-btn");
  const gameStatus = document.getElementById("status");
  const targetBox = document.getElementById("target");
  const scoreDisplay = document.getElementById("score");
  const optionsContainer = document.getElementById("options");
  const primaryButtons = document.querySelectorAll(".primary-btn");
  const gameCont = document.getElementById('game-cont')
  gameCont.style.display = 'none'

  let score = 0;
  scoreDisplay.textContent = score;

  let currentColors = [];
  let targetColor = "";

  const colorGroups = {
    red: ["#ff0000", "#cc0000", "#990000", "#ff6666", "#ff4d4d"],
    blue: ["#0000ff", "#0000cc", "#000099", "#6666ff", "#4d4dff"],
    green: ["#00ff00", "#00cc00", "#009900", "#66ff66", "#4dff4d"],
  };

  function showPrimarySelection() {
    gameCont.style.display = 'none'
    gameStatus.textContent = "Choose a primary color to start!";
    gameStatus.style.display = "block";

    document.getElementById("primary-selection").style.display = "block";

    primaryButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const selectedPrimary = btn.getAttribute("data-color");
        currentColors = colorGroups[selectedPrimary];
        document.getElementById("primary-selection").style.display = "none";
        startRound();
      });
    });
  }

  function startRound() {
    gameStatus.style.display = "none";
    gameCont.style.display = 'block'

    targetColor = currentColors[Math.floor(Math.random() * currentColors.length)];
    targetBox.style.backgroundColor = targetColor;

    const optionButtons = document.querySelectorAll(".opt-btn");
    optionButtons.forEach((option, index) => {
      option.style.backgroundColor = currentColors[index];
      option.setAttribute("data-value", currentColors[index]);
      option.onclick = () => handleSelection(option);
    });
  }

  function handleSelection(option) {
    const selectedColor = option.getAttribute("data-value");

    if (selectedColor === targetColor) {
      score++;
      gameStatus.textContent = "Correct! Next round...";
    } else {
      score--;
      gameStatus.textContent = "Wrong! Next round...";
    }

    scoreDisplay.textContent = score;
    gameStatus.style.display = "block";

    if (score >= 5) {
      endGame("Congratulations! You won!");
    } else if (score < 0) {
      endGame("Game Over! You lost.");
    } else {
      setTimeout(startRound, 1500);
    }
  }

  function endGame(message) {
    gameStatus.textContent = message;
    gameStatus.style.display = "block";
    startBtn.style.display = "none";
    newGameBtn.style.display = "block";
    
  }

  function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    gameStatus.textContent = "Read the instructions and press Start Game.";
    gameStatus.style.display = "block";
    startBtn.style.display = "block";
    newGameBtn.style.display = "none";
    document.getElementById("primary-selection").style.display = "none";
    targetBox.style.backgroundColor = "white";
    gameCont.style.display = 'none'
  }

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    showPrimarySelection();
  });

  newGameBtn.addEventListener("click", resetGame);

  resetGame();
});