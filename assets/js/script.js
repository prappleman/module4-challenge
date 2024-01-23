// button variables
var startButtonEl = document.querySelector("#start-btn");
var questButtons = document.querySelectorAll(".quest-btn");
var retryButtonE1 = document.querySelector("#retry-btn");
var saveButtonE1 = document.querySelector("#savescore-btn");

// page variables
var startpageE1 = document.querySelector("#startpage");
var questpageE1 = document.querySelector("#questpage");


// timer variables
var timeEl = document.querySelector(".timer");
var timerInterval;
var secondsLeft = 31;



// timer function (start button)

startButtonEl.addEventListener('click', function setTime() {

  localStorage.setItem("hasSavedScore", JSON.stringify(false));

  currentQuestion = 0;
  secondsLeft = 31;
  score = 100;

  displayQuestion(questions[currentQuestion]);
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {

    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds";

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "";
          
      // unanswered questions
      var unansweredQuestions = questions.length - (currentQuestion);
      var unansweredPenalty = unansweredQuestions * penaltyForUnanswered;
      score -= unansweredPenalty;
      console.log("unanswered penalty " + unansweredPenalty)
      console.log("unanswered questions " + unansweredQuestions)
      
      document.getElementById("resultpage").style.display = "block";
      document.getElementById("startpage").style.display = "none";
      document.getElementById("questpage").style.display = "none";
    }
    updateScore();
  }, 1000);
  
document.getElementById("resultpage").style.display = "none";
document.getElementById("startpage").style.display = "none";
document.getElementById("questpage").style.display = "block";
});



// timer reset (retry button)

retryButtonE1.addEventListener('click', function setTime() {

  localStorage.setItem("hasSavedScore", JSON.stringify(false));

  currentQuestion = 0;
  secondsLeft = 31;
  score = 100;
  playerName = "";

  displayQuestion(questions[currentQuestion]);
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {

    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds";

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "";
          
      // unanswered questions
      var unansweredQuestions = questions.length - (currentQuestion);
      var unansweredPenalty = unansweredQuestions * penaltyForUnanswered;
      score -= unansweredPenalty;
      console.log("unanswered penalty " + unansweredPenalty)
      console.log("unanswered questions " + unansweredQuestions)
      
      document.getElementById("resultpage").style.display = "block";
      document.getElementById("startpage").style.display = "none";
      document.getElementById("questpage").style.display = "none";
    }
    updateScore();
  }, 1000);
  
document.getElementById("resultpage").style.display = "none";
document.getElementById("startpage").style.display = "none";
document.getElementById("questpage").style.display = "block";
});



// question information

var questions = [
  {
  question: "What is the official state dinosaur of Utah?",
  options: ["Allosaurus", "Stegosaurus", "Triceratops", "Velociraptor"],
  answer: "Allosaurus"
},
{
  question: "Which natural arch is the largest in the world and located in Utah?",
  options: ["Delicate Arch", "Landscape Arch", "Rainbow Bridge", "Corona Arch"],
  answer: "Landscape Arch"
},
{
  question: "Which national park in Utah is famous for its slot canyons like The Narrows?",
  options: ["Arches National Park", "Bryce Canyon National Park", "Zion National Park", "Canyonlands National Park"],
  answer: "Zion National Park"
},
{
  question: "Utah is home to the largest saltwater lake in the Western Hemisphere. What is its name?",
  options: ["Great Salt Lake", "Utah Lake", "Bear Lake", "Sevier Lake"],
  answer: "Great Salt Lake"
},
{
  question: "Utah is famous for having 'The Greatest Snow on Earth.' Which ski resort claims this slogan?",
  options: ["Snowbird", "Park City Mountain Resort", "Deer Valley Resort", "Alta Ski Area"],
  answer: "Snowbird"
}
];



// display questions function

var currentQuestion = 0;

function displayQuestion(question) {
  document.getElementById("question").innerText = question.question;
  document.getElementById("option1").innerText = question.options[0];
  document.getElementById("option2").innerText = question.options[1];
  document.getElementById("option3").innerText = question.options[2];
  document.getElementById("option4").innerText = question.options[3];
}



// next question

function nextQuestion() {

  setTimeout(function() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      displayQuestion(questions[currentQuestion]);
      console.log(currentQuestion)
    } else {

      clearInterval(timerInterval);
      timeEl.textContent = "";
          
      // spare time
      var spareTime = secondsLeft;
      score += spareTime;
      console.log("spare time " + spareTime)
      

      // switch to result page
      document.getElementById("resultpage").style.display = "block";
      document.getElementById("startpage").style.display = "none";
      document.getElementById("questpage").style.display = "none";
    }

    updateScore();
  }, 500);
}



// score variables

var score = 100;
var penaltyForIncorrect = 10;
var penaltyForUnanswered = 20;



// correct answer checker (button color changer)
questButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (button.textContent === questions[currentQuestion].answer) {
      nextQuestion();
      button.style.backgroundColor = 'green';
      button.style.color = 'white';

      setTimeout(function() {
        button.style.backgroundColor = '';
        button.style.color = 'black';
      }, 500);
    } else {
      button.style.backgroundColor = 'red';
      button.style.color = 'white';

      // Deduct points and time for incorrect answer
      score -= penaltyForIncorrect;
      secondsLeft -= penaltyForIncorrect;

      setTimeout(function() {
        button.style.backgroundColor = '';
        button.style.color = 'black';
      }, 500);
    }

    // Display score and handle end of quiz
    updateScore();
  });
});


function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
  console.log(score)
}


// start question display
displayQuestion(questions[currentQuestion]);


// Display initial score
updateScore();


// Check if the score has already been saved
var hasSavedScore = JSON.parse(localStorage.getItem("hasSavedScore")) || false;

saveButtonE1.addEventListener('click', function saveScore() {
  if (!hasSavedScore) {

  // Set the flag to indicate that the score has been saved
  localStorage.setItem("hasSavedScore", JSON.stringify(true));
  console.log("score has been input")

  // Get the player's name and current score
  var playerName = document.getElementById("playerName").value;
  var endScore = score;

  // Retrieve existing scores from local storage
  var existingScores = JSON.parse(localStorage.getItem("finalScores")) || [];

  // Add the new score to the array
  existingScores.push({ name: playerName, score: endScore });

  // Save the updated scores back to local storage
  localStorage.setItem("finalScores", JSON.stringify(existingScores));

  console.log("Saved!");

  // Reset field
  document.getElementById("playerName").value = "";
} else {
  console.log("Score has already been saved.");
  // Optionally, you can display a message to the user indicating that the score has already been saved.
}
});