/*
 * Create a list that holds all of your cards
 */
const cardType = ['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf', 'fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];

function createCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
/*
 *  Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
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
/*
 * y set up the event listener for a card. If a card is clicked:
 * y - display the card's symbol (put this functionality in another function that you call from this one)
 * y - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * y - if the list already has another card, check to see if the two cards match
 * y  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * y  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * y   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function to start the game and global variable
const deck = document.querySelector('.deck');
//function
function gameStart() {
  const cardHTML = shuffle(cardType).map(function(card){
    return createCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

gameStart();
//----------------------------------------------------------------------------
//function to assign stars
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

function starRater () {
  if (moves === 5 || moves === 10) {
    loseStar();
  }
}
//----------------------------------------------------------------------------
//function to run the game & count Moves
//global variables
const cards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
const moveCounter = document.querySelector('.moves');


cards.forEach(function(card) {
  card.addEventListener('click',function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
        openCards.push(card);
        card.classList.add('open','show');
      if (openCards.length == 2) { //matches cards together
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.remove('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.remove('show');

          openCards = [];
        } else {
            setTimeout(function(){ //flips cards over on a timer if they don't match
              openCards.forEach(function(card){
                card.classList.remove('open','show')
              });

            openCards = [];
          }, 1000);
        }
        moves += 1;
        moveCounter.innerText = moves;
        starRater();
      }
    }
  });
});
//---------------------------------------------------------------------------
//code for timer
let time = 0;
let countTimer;
let timer;
let totalSeconds = 0;
const clock = document.querySelector('.clock');


deck.addEventListener('click', event => {
  if (time===0){
    let timer = setInterval(countTimer, 1000);

    function countTimer() {
     ++totalSeconds;
     const hours = Math.floor(totalSeconds /3600);
     const minutes = Math.floor((totalSeconds - hours*3600)/60);
     const seconds = totalSeconds - (hours*3600 + minutes*60);
      if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
      }  else {
        clock.innerHTML = `${minutes}:${seconds}`;
      }
     console.log(clock.innerText);
    };
    time=1;
  }
});

/*function stopClock() {
  clearInterval(timer);
}*/

//stopClock();
//------------------------------------------------------------------------------
//modal

const modal = document.querySelector('.modal_display');
