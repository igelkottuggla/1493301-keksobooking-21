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
    const locationX = getRandomNumber(1, 1000); // 600
    const locationY = getRandomNumber(1, 1000); // 350
    return `${locationX}, ${locationY}`;
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    getRandomNumber,
    getRandomItem,
    getRandomArray,
    getRandomLocation,
  };
})();
