'use strict';
//tutorial from webdevtrick.com
function MyQuiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

MyQuiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

MyQuiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

MyQuiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function MyQuestion(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

MyQuestion.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");//p tag
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");//p tag in footer
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    var element = document.getElementById("Questions");//div
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new MyQuestion("How old was Aang when he was found in the iceberg?", ["12", "112","35"], "112"),
    new MyQuestion("What is the capital of the Earth Kingdom?", ["Si Wong", "Chu", "Ba Sing Se"], "Ba Sing Se"),
    new MyQuestion("Who said this: 'Destiny is a funny thing. You never know how things are going to work out'", ["Azula", "Uncle Iroh","Fire Lord Ozai"], "Uncle Iroh"),
    new MyQuestion("How many Agni Kais take place in ATLA?", ["2", "3", "4"], "3")
];

// create quiz
var quiz = new MyQuiz(questions);

// display quiz
populate(); 



