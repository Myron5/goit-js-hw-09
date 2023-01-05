let timerId = null;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const changeBodyColor = () =>
  (document.querySelector('body').style.backgroundColor = getRandomHexColor());

const onStartClick = e => {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
  changeBodyColor();
  timerId = setInterval(changeBodyColor, 1000);
};

const onStopClick = () => {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
  clearInterval(timerId);
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);
