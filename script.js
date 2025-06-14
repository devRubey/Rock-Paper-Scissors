let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  draws: 0,
  history: []
};

const winSound = new Audio('sounds/win.wav');
const loseSound = new Audio('sounds/lose.wav');
const drawSound = new Audio('sounds/draw.wav');

// Prevents overlapping sound
function playSound(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

// Picks a random move for the bot
function getBotMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

// Handles the full game logic
function playGame(playerMove) {
  const botMove = getBotMove();
  let result = '';

  if (playerMove === botMove) {
    result = 'Draw!';
    score.draws++;
    playSound(drawSound);
  } else if (
    (playerMove === 'rock' && botMove === 'scissors') ||
    (playerMove === 'paper' && botMove === 'rock') ||
    (playerMove === 'scissors' && botMove === 'paper')
  ) {
    result = 'You win!';
    score.wins++;
    playSound(winSound);
  } else {
    result = 'You lose!';
    score.losses++;
    playSound(loseSound);
  }

  // Save match to history
  score.history.unshift(`You: ${playerMove} | Bot: ${botMove} → ${result}`);
  if (score.history.length > 10) score.history.pop();

  // Save everything
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreDisplay();
  updateHistoryDisplay();
}

// Updates score UI
function updateScoreDisplay() {
  document.querySelector('.score').innerText =
    `Wins: ${score.wins} | Losses: ${score.losses} | Draws: ${score.draws}`;
}

// Updates match history UI
function updateHistoryDisplay() {
  const historyList = document.querySelector('.history');
  historyList.innerHTML = '';
  score.history.forEach(match => {
    const li = document.createElement('li');
    li.innerText = match;
    historyList.appendChild(li);
  });
}

// Reset button
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    draws: 0,
    history: []
  };
  localStorage.removeItem('score');
  updateScoreDisplay();
  updateHistoryDisplay();
}

// Initial display update
document.addEventListener('DOMContentLoaded', () => {
  updateScoreDisplay();
  updateHistoryDisplay();
});
