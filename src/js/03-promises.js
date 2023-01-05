import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, step, amount } = {
    delay: Number(e.currentTarget.elements.delay.value),
    step: Number(e.currentTarget.elements.step.value),
    amount: Number(e.currentTarget.elements.amount.value),
  };

  for (
    let delayIterator = delay, count = 1;
    count <= amount;
    count += 1, delayIterator += step
  ) {
    createPromise(count, delayIterator)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) setTimeout(() => resolve({ position, delay }), delay);
    else setTimeout(() => reject({ position, delay }), delay);
  });
}
