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