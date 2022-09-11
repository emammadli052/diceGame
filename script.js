'use strict';
// which player gets 100 points first he will be winner of the game🏆
const diceEL = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
// players for checking it is active or not
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
// calculated after each rolling
const playerOneOverallScore = document.getElementById('current--0');
const playerTwoOverallScore = document.getElementById('current--1');
//calculate after each hold button click
let playerOneCurrentScore = document.querySelector('#score--0');
let playerTwoCurrentScore = document.querySelector('#score--1');
// these values reflect both players scores and will be usefull for reset logic
const playersOverallScore = document.querySelectorAll('.current-score');
const playersCurrentScore = document.querySelectorAll('.score');
// prompt for players name
const playerOneName = document.querySelector('#name--0');
const playerTwoName = document.querySelector('#name--1');

// some intial values will be useful for resetting logic
let sum = 0;
let isPlayerOneTurn = true;
let isPlayerTwoTurn = false;
// playerOneName.textContent = prompt('Enter name for first player please: ');
// playerTwoName.textContent = prompt('Enter name for second player please: ');
// function to roll the dice
const rollDice = () => {
  let random = Math.ceil(Math.random() * 6);
  diceEL.src = `./assets/dice-${random}.png`;
  diceEL.hidden = false;
  // if dice is equl to 1 then all current sum will be 0 and next player's turn starts
  if (random === 1) {
    playerOneOverallScore.textContent != 0
      ? (playerOneOverallScore.textContent = 0)
      : (playerTwoOverallScore.textContent = 0);
    changePlayerTurn();
    console.log('You rolled dice 1 😒');
  } else {
    if (isPlayerOneTurn) {
      sum += random;
      playerOneOverallScore.textContent = sum;
    } else {
      sum += random;
      playerTwoOverallScore.textContent = sum;
    }
  }
};

// function to change player turn after each holdscore button click
const changePlayerTurn = () => {
  if (isPlayerOneTurn) {
    playerOne.classList.remove('player--active');
    playerTwo.classList.add('player--active');
    isPlayerOneTurn = false;
    isPlayerTwoTurn = true;
    sum = 0;
    console.log('2️⃣ Player Two turn started...');
  } else {
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
    isPlayerOneTurn = true;
    isPlayerTwoTurn = false;
    sum = 0;
    console.log('1️⃣ Player One turn started...');
  }
};

// save score and reset sumscore to 0, then change player turn
const holdScore = () => {
  if (isPlayerOneTurn) {
    playerOneCurrentScore.textContent =
      Number(playerOneCurrentScore.textContent) + sum;
    playerOneOverallScore.textContent = 0;
    console.log(
      checkWinner(Number(playerOneCurrentScore.textContent)) + 'Player One'
    );
    changePlayerTurn();
  } else {
    playerTwoCurrentScore.textContent =
      Number(playerTwoCurrentScore.textContent) + sum;
    playerTwoOverallScore.textContent = 0;
    console.log(
      checkWinner(Number(playerTwoCurrentScore.textContent)) + 'Player Two'
    );
    changePlayerTurn();
  }
  diceEL.hidden = true;
};

// new button logic goes here, this button will reset whole values
const resetGame = () => {
  playersCurrentScore.forEach(score => {
    score.textContent = 0;
  });
  playersOverallScore.forEach(score => {
    score.textContent = 0;
  });
  isPlayerOneTurn = true;
  playerOne.classList.add('player--active');
  isPlayerTwoTurn = false;
  playerTwo.classList.remove('player--active');
  diceEL.hidden = true;
};

const checkWinner = winner => {
  return winner >= 100 ? 'congtars... ' : 'Awesome game by ';
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', resetGame);
