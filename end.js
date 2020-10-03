const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const valueScore = document.querySelector('.finalScore')
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

valueScore.innerText = mostRecentScore;
 

username.addEventListener('keyup',()=>{
    console.log(username.value)
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e =>{

const score = {
    score:  mostRecentScore,
    name: username.value
};

highScores.push(score)
highScores.sort((a,b)=>{
    b.score - a.score 
})
highScores.splice(6)
localStorage.setItem("highScores",JSON.stringify(highScores));
window.location.assign('/')

} 
   