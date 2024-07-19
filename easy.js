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
        Swal.fire({
            title: "Good job!",
            text: "You Completed Easy Level 👍" ,
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    window.location.assign("./medium.html");
                }, 1000); 
            }
        });
    }
    if (minutes === 0 && seconds === 30) 
    {
        stopTimer();
        // alert("Time's up! Game over. Restart Again!");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You Lose! 👎 Restart Again",
          });
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



// to show alert to the home button
function showHomeAlert() {
    Swal.fire({
      title: 'Do you want to leave?',
      text: "You will lose your progress!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Redirecting...',
          'Your progress will be lost.',
          'success'
        ).then(() => {
          window.location.href = "./index.html";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You can continue playing.',
          'info'
        );
      }
    });
  }
  