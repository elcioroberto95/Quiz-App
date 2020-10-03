const question = document.getElementById('question');

const choices = document.querySelectorAll('.choice-text');
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
const full = document.getElementById('full');
const loader = document.getElementById('loader')
const game = document.getElementById('game')
let currentQuestion = {};
let acceptionAnswer = true;
let score = 0;
let questionCounter = 0;
let current_bonus = 1;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=15&category=18&difficulty=hard&type=multiple")
    .then(res =>{
      return res.json();

    })
    .then(loadedQuestions => {
  
    console.log(loadedQuestions.results);

    questions =  loadedQuestions.results.map(loadedQuestion => {

        const formattedQuestion = {

        question: loadedQuestion.question
   
        };

    const answerChoices = [...loadedQuestion.incorrect_answers];

    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

    answerChoices.splice(
        formattedQuestion.answer -1 , 0 , loadedQuestion.correct_answer);
    
    
    answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice
        
    })
    return formattedQuestion
    });
  
    startgame()
})
.catch(err =>{
    console.error(err)
})
const correct_bonus = 10;
const max_questions = 15;


let startgame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion()
    game.classList.remove("hidden");
    loader.classList.toggle("hidden");  
}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign('/end.html');

        }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${max_questions}`
  
    full.style.width = `${(questionCounter / max_questions) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion[`choice${number}`]

    });

    availableQuestions.splice(questionIndex, 1);

    acceptionAnswer = true;
};
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptionAnswer) return;
        acceptionAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedChoice);
    const classToAply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToAply);
    if(classToAply == "correct"){
        incrementSouce(1)
    }
    setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToAply);
        
        getNewQuestion()
    },2000)
        
       

    })
})
incrementSouce = num =>{
score+=num;
scoreText.innerText = score;



}

