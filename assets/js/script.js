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

  // Display Set
function displaySet(x) {
    // Display Question
    renderQuestion(qabank[x]?.question || "");
  
    // Randomly Sort Choices
    const randSeq = [];
    for (let i = 0; i <= 3; i++) {
      randSeq.push(i);
    }
    randSeq.sort(function (a, b) {
      return 0.5 - Math.random();
    });
  
    // Display Choices
    randSeq.forEach((index) => {
      renderListItems(qabank[x]?.choices[index] || "");
    });
  }
  
  // Next Set of Questions and Choices
  function nextSet() {
    quizChoices.innerHTML = "";
    questionStart++;
    if (questionStart <= indexOfQuestions) {
      displaySet(questionStart);
    } else {
      currentScore += globalTimer;
      globalTimer = 0;
      quizChoices.innerHTML = "";
      enterHighScore();
    }
  }
  
  // Start Timer
function countdown() {
    timeLeft.textContent = `00:0${Math.floor(globalTimer / 60)}:${Math.floor(
      (globalTimer % 60) / 10
    )}${globalTimer % 10}`;
    const timeInterval = setInterval(function () {
      globalTimer--;
      timeLeft.textContent = `00:0${Math.floor(globalTimer / 60)}:${Math.floor(
        (globalTimer % 60) / 10
      )}${globalTimer % 10}`;
  
      // Game Ends when timer runs out
      if (globalTimer <= 0) {
        clearInterval(timeInterval);
        timeLeft.textContent = "00:00:00";
        quizChoices.innerHTML = "";
  
        // Enter High Score
        if (questionStart <= indexOfQuestions) {
          enterHighScore();
        }
      }
    }, 1000);
  }

  // Hide button
function hideButton() {
    startGame.style.display = "none";
  }
  
  // Show button
  function showButton() {
    startGame.style.display = "initial";
  }
  
  // Initialize
  function init() {
    timeLeft.textContent = "00:00:00";
    showButton();
    globalTimer = 0;
    currentScore = 0;
    questionStart = 0;
    paragraph.style.display = "block";
    messageDisplay.textContent = "";
    messageDisplay.classList.remove("correct", "incorrect");
  }
  
  init();

  // Game Start
function startGameHandler() {
    paragraph.style.display = "none";
  
    // Start Settings
    globalTimer = 120;
    hideButton();
    countdown();
  
    // This displays the initial question
    displaySet(questionStart);
  }
  
  startGame.addEventListener("click", startGameHandler);

  // Quiz Choice Listener
function quizChoiceHandler(event) {
    const userChoice = event.target;
    const selectedAnswer = userChoice.textContent;
  
    // If question is correct, display the below:
    if (selectedAnswer === qabank[questionStart]?.answer) {
      messageDisplay.textContent = "Correct!";
      messageDisplay.classList.add("correct");
      currentScore += 100;
      globalTimer += 5;
    } else {
      // If question is incorrect, display the below:
      messageDisplay.textContent = "Incorrect!";
      messageDisplay.classList.add("incorrect");
      globalTimer -= 15;
    }
  
    // Timeout function
    setTimeout(function () {
      messageDisplay.textContent = "";
      messageDisplay.classList.remove("correct", "incorrect");
      nextSet();
    }, 1000);
  }
  
  quizChoices.addEventListener("click", quizChoiceHandler);