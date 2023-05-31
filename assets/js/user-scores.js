// Function to clear scores
function clearScores() {
    // Clear the high scores
    localStorage.removeItem("allScores");
  
    // Display "No High Scores yet!"
    document.querySelector(".quizGame").innerHTML = "No High Scores yet!";
  }
  
  // Display scores
  function displayScores() {
    // Get the stored scores and parse them
    const storedScores = JSON.parse(localStorage.getItem("allScores"));
  
    // Check if saved scores exist or not
    if (storedScores !== null) {
      // Sort the scores in descending order based on the score value
      const sortedScores = storedScores.sort((a, b) => b.score - a.score);
  
      let scoresHTML = "";
      for (let i = 0; i < sortedScores.length; i++) {
        const names = sortedScores[i].names;
        const score = sortedScores[i].score;
        scoresHTML += `${names}: ${score}<br>`;
      }
      document.querySelector(".quizGame").innerHTML = scoresHTML;
    } else {
      // Also Displays "No High Scores yet!"
      document.querySelector(".quizGame").innerHTML = "No High Scores yet!";
    }
  }
  
  // Call the displayScores() function to display scores
  displayScores();
  
  // Add event listener to the "Clear Scores" button
  document.getElementById("clearScoresButton").addEventListener("click", clearScores);  