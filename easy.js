var cards = document.querySelectorAll('.card');


var firstcard;
var secondcard;
var flippedcard = false;
var gameCompleted = false;
cards.forEach((value) => {
        value.addEventListener('click', () => {
            value.classList.add('flip');

          
// to store cards
if(!flippedcard)
{
    // firstclick
    flippedcard = true;
    firstcard = value;
    // console.log(firstcard)
}
else{
    // second click
    flippedcard = false;
    secondcard = value;
 // match or not
    if(firstcard.dataset.framework == secondcard.dataset.framework)
    {
      firstcard.removeEventListener('click');
      secondcard.removeEventListener('click');
    }
    // used to flip after 5 sec 
   else{
    setTimeout(()=>{
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
    },500);
   }
}
 });
    });
 
    
   
// for time
var time = document.getElementById("timeDisplay");
// varbiles
let seconds = 0;
let minutes = 0;
let timerInterval;
// to start timer

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}
startTimer();
function stopTimer() {
    clearInterval(timerInterval);
}
function restartTimer() {
    seconds = 0;
    minutes = 0;
    updateDisplay();
    stopTimer();
    startTimer();
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    updateDisplay();

    let allCardsMatched = true;
    cards.forEach((card) => {
        if (!card.classList.contains('flip')) {
            allCardsMatched = false;
        }
    });

    if (allCardsMatched) {
        stopTimer();
        alert("Congratulations! You completed the game within the time limit, Go to Next Level");
        setTimeout(()=>{
            window.location.assign("./index.html")
           
        },500);
        setTimeout(()=>{
           
        },100);
     
    }

    if (minutes === 0 && seconds === 30) 
    {
        stopTimer();
        alert("Time's up! Game over. Restart Again!");
        }
}

function updateDisplay() {
    let secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let minutesDisplay = minutes < 10 ? `0${minutes}` : `${minutes}`;
    time.innerHTML = `Time: ${minutesDisplay}:${secondsDisplay}`;
}
// / reset cards
function resetCards() {
    cards.forEach((value) => {
        value.classList.remove('flip');
    });
}
//  for button 
var btn = document.getElementsByTagName("button");
btn[0].addEventListener('click',()=>{
    resetCards();
    shuffle();
});
// for shuffling
function shuffle()
{
    cards.forEach((value)=>{
        var shuffleing =Math.floor (Math.random() *12);
        value.style.order = shuffleing;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    shuffle();
});




