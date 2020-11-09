'use strict';
(function () {
  const {addForm} = window.form;

  const PIN_WIDTH = 60;
  const PIN_HEIGHT = 64;
  const PIN_INCEPTION_X = 570;
  const PIN_INCEPTION_Y = 375;

  const pinsArea = document.querySelector(`.map__pins`);
  const locationXMax = document.querySelector(`.map__pins`).clientWidth;
  const mainPin = pinsArea.querySelector(`.map__pin--main`);

  const mainPinAddressInput = addForm.querySelector(`#address`);

  const mainPinsStartPosition = {
    x: Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2),
    y: Math.floor(mainPin.offsetTop + PIN_HEIGHT / 2)
  };

  const setMainPinPosition = function () {
    mainPinAddressInput.value = `${mainPinsStartPosition.x}, ${mainPinsStartPosition.y}`;
  };

  setMainPinPosition();

  const assignAddress = function () {
    const newPinPositionY = Math.floor(mainPin.offsetTop + PIN_HEIGHT);
    const newPinPositionX = Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2);
    mainPinAddressInput.value = `${newPinPositionX}, ${newPinPositionY}`;
  };

  mainPinAddressInput.setAttribute(`readonly`, `true`);

  window.starterPin = {
    assignAddress,
    pinsArea,
    mainPin,
    locationXMax,
    PIN_WIDTH,
    PIN_HEIGHT,
    PIN_INCEPTION_X,
    PIN_INCEPTION_Y,
    setMainPinPosition,
  };
})();
