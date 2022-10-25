// listener for button to begin quiz
document.querySelector(".startQuiz").addEventListener("click", function () {
  // once quiz starts, start area display turns to hidden
  document.querySelector(".start-area").style.display = "none";
  // quiz questions and timer display in block
  document.querySelector(".quiz-area").style.display = "block";
  displayQuestions();
  startTimer();
});
// quiz variables for timer and questions
var time = 60;
var timer;
var questionIndex = 0;
// array of questions 1-3
var questions = [
  {
    question: "What is HTML?",
    // possible answers
    choices: [
      "Hypertext Markup Language",
      "Cascading Style Sheet",
      "Computer",
      "sup",
    ],
    // correct answers
    answer: "Hypertext Markup Language",
  },

  {
    question: "What is CSS?",
    choices: ["Cascading Style Sheet", "color", "red", "black"],
    answer: "Cascading Style Sheet",
  },

  {
    question: "What does JSON stand for?",
    choices: [
      "JavaScript Object Notation",
      "JavaScript Oh No",
      "HTML",
      "JQuery",
    ],
    answer: "JavaScript Object Notation",
  },
];
// function for cycling through questions until all have been answered
function displayQuestions() {
  if (questionIndex === questions.length) {
    // once all questions are answered timer stops and scores display
    clearInterval(timer);
    document.querySelector(".quiz-area").style.display = "none";
    document.querySelector(".scores").style.display = "block";
    document.querySelector(".highscores").innerText = "score " + time;
    return;
  }
  // edits questions on screen
  document.querySelector(".questionText").innerText =
    questions[questionIndex].question;
  document.querySelector(".answer1").innerText =
    questions[questionIndex].choices[0];
  document.querySelector(".answer2").innerText =
    questions[questionIndex].choices[1];
  document.querySelector(".answer3").innerText =
    questions[questionIndex].choices[2];
  document.querySelector(".answer4").innerText =
    questions[questionIndex].choices[3];
}
// if user selects wrong answer 3 seconds are subracted from the timer
document
  .querySelector(".quiz-area")
  .addEventListener("click", function (event) {
    console.log(event);
    if (event.target.nodeName === "BUTTON") {
      var userChoice = event.target.innerText;
      var correctChoice = questions[questionIndex].answer;
      if (userChoice === correctChoice) {
        console.log("correct");
      } else {
        console.log("incorrect");
        time -= 3;
      }
      questionIndex++;
      displayQuestions();
    }
  });
// function and interval for timer
function startTimer() {
  timer = setInterval(function () {
    if (time > 0) {
      time--;
      document.querySelector(".timer").innerText = time;
    }
  }, 1000);
}
// event listeners for submit button and initials.
document.querySelector(".submit").addEventListener("click", function () {
  var initials = document.querySelector(".initials").value;
  var highscores = JSON.parse(localStorage.getItem("scores")) || [];
  highscores.push({ name: initials, score: time });
  localStorage.setItem("scores", JSON.stringify(highscores));
  window.location.reload();
});
// edits highscores on page.
var highscores = JSON.parse(localStorage.getItem("scores")) || [];
for (var i = 0; i < highscores.length; i++) {
  var score = document.createElement("p");
  score.innerText = highscores[i].name + " " + highscores[i].score;
  document.querySelector(".old-scores").appendChild(score);
}
