//------------------------------------------------------------------------------
//Section for initial game setup and start--------------------------------------
//List of cards in the card deck
const cardDeck = ['fa-diamond','fa-diamond','fa-paper-plane-o',
'fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube',
'fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
//function to activate cards and allow them to accept data
function createCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
//function to shuffle cards at the game start (provided by Udacity)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//global variable to define the deck using a document method
const deck = document.querySelector('.deck');
//function to start the game
function gameStart() {
  const cardHTML = shuffle(cardDeck).map(function(card){ //calling this function shuffles the cards
    return createCard(card);
  });
  deck.innerHTML = cardHTML.join(''); //attaches the card's data to the card in the deck

  deck.addEventListener("click", startTimer); //uses a click event to start timer

  const cards = document.querySelectorAll('.card');
  let cardItems = [].slice.call(cards);

    cardItems.forEach(function (card) {
    card.addEventListener('click', function (event) { //adds a click event and gives card functionality to each card
      cardFunctionality(this);
    });
    });
}
gameStart(); //calls the game start
//function to end the game
function gameOver() {
  stopTimer();
  addModalData();
  toggleModal();
}
//------------------------------------------------------------------------------
//Section for card functionality, moves, and condition for modal popup----------
//global variables
let cardsFacingUp = [];
let moves = 0;
const moveCounter = document.querySelector('.moves');
let matchingCards = 0;
const totalMatches = 8;
//function to control card matches/mismatches and count moves
function cardFunctionality (card) {
  if (cardsFacingUp.length<2 && !card.classList.contains("open") &&
  !card.classList.contains("show") && !card.classList.contains("match")){
    cardsFacingUp.push(card); //first conditional statement to determine the actions after a card is clicked
    card.classList.add('open','show');
    if (cardsFacingUp.length == 2) {
      if (cardsFacingUp[0].dataset.card == cardsFacingUp[1].dataset.card) { //condition to add the match class to cards with matching data
        cardsFacingUp[0].classList.add('match');
        cardsFacingUp[0].classList.add('open');
        cardsFacingUp[0].classList.remove('show');
        cardsFacingUp[1].classList.add('match');
        cardsFacingUp[1].classList.add('open');
        cardsFacingUp[1].classList.remove('show');
        cardsFacingUp = [];
        matchingCards++;
          if (matchingCards === totalMatches) { //condition to end the game once all of the cards have been matched
            gameOver();
          }
      } else {
          setTimeout(function(){ //condition to flip cards back over if they don't match
            cardsFacingUp.forEach(function(card){
              card.classList.remove('open','show')
            });
          cardsFacingUp = [];
        }, 1000);
      }
      moves += 1;
      moveCounter.innerText = moves; //writes the total number of moves
      numberOfStars(); //calls the total number of stars
    }
  }
}
//------------------------------------------------------------------------------
//Section for star control------------------------------------------------------
//function to lose a star
function loseStar() {
  const stars = document.querySelectorAll('.stars li');
  for (star of stars) {
      if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
      } else {
      }
  }
}
//functions to control the number of stars
function numberOfStars () {
  if (moves === 10 || moves === 20) {
    loseStar();
  }
}
//function to tally and display the final number of stars
function finalNumberOfStars () {
  stars = document.querySelectorAll('.stars li');
  let starCount = 0;
  for (star of stars) {
    if (star.style.display!== 'none') {
      starCount++;
    }
  }
  return starCount;
}
//------------------------------------------------------------------------------
//Section for the timer---------------------------------------------------------
//global variables
let time = 0;
let timer;
let totalSeconds = 0;
const clock = document.querySelector('.clock');
//function that runs the timer
function startTimer () {
  if (time===0){
    timer = setInterval(countTimer, 1000);
    countTimer();
  }
  time=1;
}
//function for the backend of startTimer to have the timer increment by seconds
function countTimer() {
 totalSeconds++;
 const hours = Math.floor(totalSeconds/3600);
 const minutes = Math.floor((totalSeconds-hours*3600)/60);
 const seconds = totalSeconds-(hours*3600+minutes*60);
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  }  else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}
//function to stop the timer
function stopTimer() {
  clearInterval(timer);
}
//------------------------------------------------------------------------------
//Section for the modal at game end---------------------------------------------
//global variable
const modal = document.querySelector('.modal-background');
//function to toggle the modal
function toggleModal() {
  modal.classList.toggle('hide');
}
//function to write the final data to the modal popup
function addModalData(){
  const finalTime = document.querySelector('.modal-time');
  const timerTime = document.querySelector('.clock').innerHTML;
  const finalMoves = document.querySelector('.modal-moves');
  const finalStars = document.querySelector('.modal-stars');
  const stars = finalNumberOfStars();

  finalTime.innerHTML = `Time = ${timerTime}`;
  finalMoves.innerHTML = `Moves = ${moves}`;
  finalStars.innerHTML = `Stars = ${stars}`;
}
//adding click events to button functionality
document.querySelector('.modal-cancel').addEventListener('click', toggleModal);
document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal-replay').addEventListener('click', resetGame);
//------------------------------------------------------------------------------
//Section to reset--------------------------------------------------------------
//function to reset game
function resetGame () {
  if (!modal.classList.contains("hide")){ //removes the modal window if the player is replaying the game
    toggleModal();
  }
  resetTimer();
  resetMoves();
  resetStars();
  resetCards();
  matchingCards = 0;
  gameStart(); //starts a new game with a reset timer, moves, stars, and cards
}
//function to reset timer
function resetTimer() {
  stopTimer();
  timer = true;
  time = 0;
  totalSeconds = 0;
  countTimer();
}
//function to reset moves
function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}
//function to reset stars
function resetStars() {
  stars = 0;
  const starRating = document.querySelectorAll('.stars li');
  for (star of starRating) {
    star.style.display = 'inline';
  }
}
//function to reset cards
function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
