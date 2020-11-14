'use strict';
const isEscEvent = (evt, cb) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    cb();
  }
};

const isEnterEvent = (evt, cb) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    cb();
  }
};

const onError = (errorMessage) => {
  const error = document.createElement(`div`);
  error.style = `z-index: 100`;
  error.style.margin = `auto`;
  error.style.textAlign = `center`;
  error.style.backgroundColor = `#ff5635`;
  error.style.color = `white`;
  error.style.height = `115px`;
  error.style.width = `800px`;
  error.style.paddingTop = `15px`;
  error.style.paddingBottom = `40px`;
  error.style.position = `absolute`;
  error.style.top = `150px`;
  error.style.left = 0;
  error.style.right = 0;
  error.style.fontSize = `30px`;
  error.textContent = errorMessage;
  error.style.cursor = `pointer`;
  document.body.insertAdjacentElement(`afterbegin`, error);

  error.addEventListener(`click`, () => {
    error.remove();
  });
};

window.util = {
  isEscEvent,
  isEnterEvent,
  onError,
};
