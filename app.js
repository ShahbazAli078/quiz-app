const quizQues = document.getElementById("quiz-ques");
const options = document.querySelectorAll(".quiz-ooptions button");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn")
const feedBack = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer")
nextBtn.disabled = true;
let score = 0;
let currentQuestionIndex = 0;
const restartBtn = document.getElementById("restart-btn")

const question = [
    {
        question: "What is JavaScript?",
        answer: [
            "A programing language",
            "A database",
            "An oprating system",
            "A web browser"
        ],
        correctAnswer: "A programing language"
    },
    {
        question: "Which language adds interactivity to web pages?",
        answer: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which of the following methods is used to add a new element to the end of an array in JavaScript?",
        answer: [
            "pop()",
            "shift()",
            "unshift()",
            "push()"
        ],
        correctAnswer: "push()"
    }
]

let timeLeft = question.length * 60;
timerDisplay.textContent = `Time:${timeLeft} seconds`;
let timerInterval;
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time:${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedBack.textContent = "Time's up"
            options.forEach((option) => {
                option.disabled = true;
            })
        }
    }, 1000);
}

startTimer();

scoreDisplay.textContent = `Score: ${score}/${question.length}`;

// all of this is happening in the loop for the future me when you this okay 
// options[0].textContent= question[0].answer[0];
// options[1].textContent= question[0].answer[1];
// options[2].textContent= question[0].answer[2];
// options[3].textContent= question[0].answer[3];

const showQuestion = () => {
    quizQues.textContent = (currentQuestionIndex + 1) + ". " + question[currentQuestionIndex].question;
    for (let i = 0; i < question[currentQuestionIndex].answer.length; i++) {
        options[i].textContent = question[currentQuestionIndex].answer[i];
    }

}
showQuestion();

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < question.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        clearInterval(timerInterval);
        quizQues.textContent = "Quiz Completed!";
        nextBtn.disabled = true;
        clearInterval(timerInterval)
        options.forEach((btn) => {
            btn.disabled = true;
        });
        // document.getElementById("feedback").style.display = "none";


        return;
    }

    options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
        nextBtn.disabled = true;
    });

    // const feedBack = document.getElementById("feedback");
    // feedBack.textContent = "";


})

// this the code where javacscript knows is the user answer is correct or not correct 

options.forEach((option) => {
    option.addEventListener("click", () => {
        // const feedBack = document.getElementById("feedback")
        if (option.textContent === question[currentQuestionIndex].correctAnswer) {
            // feedBack.textContent = "Correct answer";
            option.classList.add("correct");

            score++;

            scoreDisplay.textContent = `Score: ${score}/${question.length}`;
        } else {
            // feedBack.textContent = "Wrong answer!";
            option.classList.add("wrong");
        }

        options.forEach((btn) => {
            btn.disabled = true;
            nextBtn.disabled = false;

        })
    })
});



restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}/${question.length}`
    showQuestion();
    clearInterval(timerInterval);
    timeLeft = question.length * 60;
    startTimer()
    options.forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong")
    });
    nextBtn.disabled = true;
    // feedBack.style.display = "";
    // feedBack.textContent = "";
})
