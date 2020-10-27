'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const modalEl = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const btnClose = document.querySelector('.btn--close');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let state;

const init = function () {
  state = {
    currentScore: 0,
    activePlayer: 0,
    playing: true,
    scores: [0, 0],
    modalOpened: false,
  };

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.contains('player--winner')
    ? player0El.classList.remove('player--winner')
    : player1El.classList.remove('player--winner');

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${state.activePlayer}`).textContent = 0;
  state.activePlayer = state.activePlayer === 0 ? 1 : 0;
  state.currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (state.playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `assets/images/dice-${dice}.png`;

    if (dice !== 1) {
      state.currentScore += dice;
      document.getElementById(`current--${state.activePlayer}`).textContent =
        state.currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (state.playing) {
    state.scores[state.activePlayer] += state.currentScore;
    document.getElementById(`score--${state.activePlayer}`).textContent =
      state.scores[state.activePlayer];

    if (state.scores[state.activePlayer] >= 100) {
      state.playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${state.activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${state.activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// Modal
const openModal = function () {
  modalEl.classList.remove('hidden-popup');
  overlay.classList.remove('hidden-popup');
};

const closeModal = function () {
  modalEl.classList.add('hidden-popup');
  overlay.classList.add('hidden-popup');
};

btnRules.addEventListener('click', function () {
  if (!state.modal) {
    openModal();
  }
});

overlay.addEventListener('click', closeModal);

btnClose.addEventListener('click', closeModal);
