const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  '#e73ca8',
  '#44ad46', 
  '#db3c34', 
  '#22cfe6', 
  '#306cb0',
  '#3bcb83',
  '#7508d4',
  '#ffffff',
  '#350505',
  '#1a1b1c',
  '#c0ce23',
  '#9d4e7c',
  '#6f9d4e',
  '#d49535',
  '#7aa59c',
];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    screens[1].classList.add('up');
    time = parseInt(event.target.getAttribute('data-time'));
    startGame();
  } 
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
})

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime (value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h2>`
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0 + size, width) - size;
  const y = getRandomNumber(0 + size, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = getRandomColor();

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = (Math.floor(Math.random() * colors.length));
  return colors[index]
}
