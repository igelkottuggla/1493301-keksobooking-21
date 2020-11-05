'use strict';
(function () {
  const {addForm} = window.form;

  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 44;

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
    mainPinAddressInput.value = `${mainPinsStartPosition.x}, ${newPinPositionY}`;
  };

  mainPinAddressInput.setAttribute(`readonly`, `true`);

  window.starterPin = {
    assignAddress,
    pinsArea,
    mainPin,
    locationXMax,
    PIN_WIDTH,
    PIN_HEIGHT,
  };
})();
