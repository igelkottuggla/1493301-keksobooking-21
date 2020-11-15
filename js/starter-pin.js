'use strict';
const {template} = window.form;

const PIN_WIDTH = 65;
const PIN_HEIGHT = 64;
const PIN_INCEPTION_X = 570;
const PIN_INCEPTION_Y = 375;

const pinsArea = document.querySelector(`.map__pins`);
const mainPin = pinsArea.querySelector(`.map__pin--main`);
const mainPinAddressInput = template.querySelector(`#address`);

const mainPinsStartPosition = {
  x: Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2),
  y: Math.floor(mainPin.offsetTop + PIN_HEIGHT / 2)
};

const setMainPinPosition = () => {
  mainPinAddressInput.value = `${mainPinsStartPosition.x}, ${mainPinsStartPosition.y}`;
};

setMainPinPosition();

const assignAddress = () => {
  const newPinPositionY = Math.floor(mainPin.offsetTop + PIN_HEIGHT);
  const newPinPositionX = Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2);
  mainPinAddressInput.value = `${newPinPositionX}, ${newPinPositionY}`;
};

mainPinAddressInput.setAttribute(`readonly`, `true`);

window.starterPin = {
  assignAddress,
  pinsArea,
  mainPin,
  PIN_WIDTH,
  PIN_HEIGHT,
  PIN_INCEPTION_X,
  PIN_INCEPTION_Y,
  setMainPinPosition,
};
