'use strict';
(function () {
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

  const getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };


  const getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  const getRandomArray = function (array) {
    return array.slice(getRandomNumber(0, array.length));
  };

  const getRandomLocation = function () {
    const locationX = getRandomNumber(1, 1000);
    const locationY = getRandomNumber(1, 1000); // 350
    return `${locationX}, ${locationY}`;
  };

  const onError = (errorMessage) => {
    const error = document.createElement(`div`);
    error.style = `z-index: 100; margin: auto; text-align: center`;
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
    getRandomNumber,
    getRandomItem,
    getRandomArray,
    getRandomLocation,
    onError,
  };
})();
