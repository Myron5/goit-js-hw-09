import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('[data-start]');
const timeRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function timeDifference(selectedDate) {
  return selectedDate.getTime() - new Date().getTime();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerUI(selectedDate, timeRefs, intervalId) {
  const dateObj = convertMs(timeDifference(selectedDate));
  const stopTimer = Object.values(dateObj).every(el => el === 0);
  if (stopTimer) {
    clearInterval(intervalId);
    document.querySelector('body').style.backgroundColor = 'red';
  }
  for (const key in timeRefs)
    timeRefs[key].textContent = String(dateObj[key]).padStart(2, '0');
}

function onSucessClose(selectedDate) {
  btnRef.toggleAttribute('disabled');
  updateTimerUI(selectedDate, timeRefs);

  btnRef.addEventListener('click', e => {
    btnRef.toggleAttribute('disabled');
    const intervalId = setInterval(() => {
      updateTimerUI(selectedDate, timeRefs, intervalId);
    }, 1000);
  });
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //   minDate: 'today',
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (timeDifference(selectedDate) <= 0)
      Notiflix.Notify.failure('Please choose a date in the future');
    else onSucessClose(selectedDate);
  },
};

flatpickr(inputRef, options);
