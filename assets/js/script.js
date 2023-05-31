// Variables needed for quiz game
const startGame = document.getElementById("startGame");
const timeLeft = document.getElementById("timeLeft");
const quizGame = document.querySelector(".quizGame");
const quizChoices = document.querySelector("#quizChoices");
const quizQuestion = document.querySelector("#quizQuestion");
const paragraph = document.querySelector("#game-paragraph");
const messageDisplay = document.createElement("p");
quizGame.appendChild(messageDisplay);

// Quiz questions + answers are stored in quiz-questions.js
const indexOfQuestions = Object.keys(qabank).length - 1;

// Additional variables needed
let globalTimer = 0;
let currentScore = 0;
let questionStart = 0;

// Questions for quizQuestion
function renderQuestion(content) {
    quizQuestion.innerHTML = content;
  }
  
  // Choices for quizChoices
  function renderListItems(content) {
    const li = document.createElement("li");
    li.textContent = content;
  
    quizChoices.appendChild(li);
  }

  // Game Over + Enter High Score using Initials
function enterHighScore() {
    quizQuestion.innerHTML = "Final Score: " + currentScore;
    const endForm = document.createElement("form");
  
    const formLabel = document.createElement("label");
    formLabel.setAttribute("for", "initials");
  
    const formInput = document.createElement("input");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("id", "initials");
    formInput.setAttribute("name", "initials");
    formInput.setAttribute("placeholder", "Enter initials");
  
    // Clear default value when input receives focus
    formInput.addEventListener("focus", function () {
      formInput.value = "";
    });
  
    const formButton = document.createElement("input");
    formButton.setAttribute("type", "submit");
    formButton.setAttribute("value", "Submit");
  
    endForm.appendChild(formLabel);
    endForm.appendChild(formInput);
    endForm.appendChild(formButton);
    quizGame.appendChild(endForm);
  }