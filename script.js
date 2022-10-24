document.querySelector(".startQuiz").addEventListener("click", function () {
  document.querySelector(".start-area").style.display = "none";
  document.querySelector(".quiz-area").style.display = "block";
  displayQuestions();
  startTimer();
});
var time = 60;
var timer;
var questionIndex = 0;
var questions = [
  {
    question: "What is HTML?",
    choices: [
      "Hypertext Markup Language",
      "Cascading Style Sheet",
      "Computer",
      "sup",
    ],
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
function displayQuestions() {
  if (questionIndex === questions.length) {
    clearInterval(timer);
    document.querySelector(".quiz-area").style.display = "none";
    document.querySelector(".scores").style.display = "block";
    document.querySelector(".highscores").innerText = "score " + time;
    return;
  }
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
function startTimer() {
  timer = setInterval(function () {
    if (time > 0) {
      time--;
      document.querySelector(".timer").innerText = time;
    }
  }, 1000);
}
document.querySelector(".submit").addEventListener("click", function () {
  var initials = document.querySelector(".initials").value;
  var highscores = JSON.parse(localStorage.getItem("scores")) || [];
  highscores.push({ name: initials, score: time });
  localStorage.setItem("scores", JSON.stringify(highscores));
  window.location.reload();
});
var highscores = JSON.parse(localStorage.getItem("scores")) || [];
for (var i = 0; i < highscores.length; i++) {
  var score = document.createElement("p");
  score.innerText = highscores[i].name + " " + highscores[i].score;
  document.querySelector(".old-scores").appendChild(score);
}
