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

const roomsWordsEndings = (ending) => {
  let lastFigure = ending;
  if (ending > 20) {
    lastFigure = ending % 10;
  }
  const endings = {
    0: ``,
    1: `а`,
    2: `ы`,
    3: `ы`,
    4: `ы`,
    5: ``,
    6: ``,
    7: ``,
    8: ``,
    9: ``,
  };
  return (ending >= 5 && ending <= 20) ? `` : endings[lastFigure];
};

const guestsWordsEndings = (ending) => {
  let lastFigure = ending;
  if (ending >= 10) {
    lastFigure = ending % 10;
  }

  return (lastFigure === 1) ? `я` : `ей`;
};


const onError = (errorMessage) => {
  const error = document.createElement(`div`);
  error.textContent = errorMessage;
  error.classList.add(`error-message`);
  document.body.insertAdjacentElement(`afterbegin`, error);

  error.addEventListener(`click`, () => {
    error.remove();
  });
};

window.util = {
  isEscEvent,
  isEnterEvent,
  onError,
  roomsWordsEndings,
  guestsWordsEndings,
};
