document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  // UI Elements
  const startBtn = document.getElementById("start-game-btn");
  const newGameBtn = document.getElementById("new-game-btn");
  const gameStatus = document.getElementById("status");
  const targetBox = document.getElementById("target");
  const scoreDisplay = document.getElementById("score");
  const optionsContainer = document.getElementById("options");
  const primaryButtons = document.querySelectorAll(".primary-btn");
  const gameCont = document.getElementById("game-cont");
  const primarySelection = document.getElementById("primary-selection");
  const instructions = document.getElementById("instructions");

  //initializations
  let score = 0;
  let currentColors = [];
  let targetColor = "";

  // Color Groups
  const colorGroups = {
    red: ["#ff0000", "#cc0000", "#990000", "#ff6666", "#ff4d4d", "#ff1a1a"],
    blue: ["#0000ff", "#0000cc", "#000099", "#6666ff", "#4d4dff", "#1a1aff"],
    green: ["#00ff00", "#00cc00", "#009900", "#66ff66", "#4dff4d", "#1aff1a"],
  };

  //Function to select a primary color
  function showPrimarySelection() {
    gameCont.style.display = "none";
    gameStatus.textContent = "Choose a primary color to continue!";
    primarySelection.style.display = "block";
    instructions.style.display = "none";
  }

  //Starts each round of the game
  function startRound() {
    primarySelection.style.display = "none";
    gameCont.style.display = "block";
    gameStatus.textContent = ""; // Hide status text

    // Randomly select the target color
    targetColor = currentColors[Math.floor(Math.random() * currentColors.length)];
    targetBox.style.backgroundColor = targetColor;

    // Populate options
    optionsContainer.innerHTML = ""; // Clear old options
    currentColors.forEach((color) => {
      const btn = document.createElement("button");
      //Add previous styles and attributes as needed
      btn.classList.add("opt-btn");
      btn.style.backgroundColor = color;
      btn.setAttribute("data-value", color);
      btn.setAttribute("data-testid", 'colorOption');
      btn.textContent = ""; // No text, just color
      btn.onclick = () => handleSelection(color);
      optionsContainer.appendChild(btn);
    });
    console.log(optionsContainer)
  }

  //Handle selection outcome
  function handleSelection(selectedColor) {
    if (selectedColor === targetColor) {
      score++;
      gameStatus.textContent = "Correct! Next round...";
    } else {
      score--;
      gameStatus.textContent = "Wrong! Next round...";
    }

    scoreDisplay.textContent = score;
    gameStatus.style.display = "block";

    // Check end conditions
    if (score >= 5) {
      endGame("Congratulations! You won!");
    } else if (score < 0) {
      endGame("Game Over! You lost.");
    } else {
      setTimeout(showPrimarySelection, 1000); // Restart with primary color selection
    }
  }

  //Ends the game after win or loss
  function endGame(message) {
    gameStatus.textContent = message;
    gameStatus.style.display = "block";
    newGameBtn.style.display = "block";
    gameCont.style.display = 'none';
  }

  //Reset the game when clicked on New Game button
  function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    gameStatus.textContent = "Read the instructions and press Start Game.";
    startBtn.style.display = "block";
    newGameBtn.style.display = "none";
    primarySelection.style.display = "none";
    gameCont.style.display = "none";
  }

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    showPrimarySelection();
  });

  newGameBtn.addEventListener("click", function () {
    score = 0;
    scoreDisplay.textContent = score;
    gameStatus.textContent = "New Game! Choose a primary color.";
    newGameBtn.style.display = "none";
    showPrimarySelection();
  });

  primaryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedPrimary = btn.getAttribute("data-color");
      currentColors = colorGroups[selectedPrimary];
      startRound();
    });
  });

  resetGame();
});
