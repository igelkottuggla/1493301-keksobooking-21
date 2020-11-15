'use strict';
const {PIN_WIDTH, PIN_HEIGHT, assignAddress, pinsArea, mainPin} = window.starterPin;
const {chart} = window.map;

const TOP_CURB = 130;
const BOTTOM_CURB = 630;
const LEFT_CURB = 0;
const RIGHT_CURB = pinsArea.offsetWidth;

const restrictions = {
  top: chart.offsetTop + TOP_CURB - PIN_HEIGHT,
  bottom: BOTTOM_CURB - PIN_HEIGHT,
  left: LEFT_CURB + Math.ceil(PIN_WIDTH / 2) - mainPin.offsetWidth,
  right: RIGHT_CURB + Math.ceil(PIN_WIDTH / 2) - mainPin.offsetWidth,
};

const onStarterPinMouseMove = (evt) => {
  evt.preventDefault();

  let startingPosition = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onMouseMotion = (motionEvt) => {
    motionEvt.preventDefault();

    const shift = {
      x: startingPosition.x - motionEvt.clientX,
      y: startingPosition.y - motionEvt.clientY,
    };

    startingPosition = {
      x: motionEvt.clientX,
      y: motionEvt.clientY,
    };

    const position = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y,
    };

    if (position.x >= restrictions.left && position.x <= restrictions.right) {
      mainPin.style.left = `${position.x}px`;
    }

    if (position.y >= restrictions.top && position.y <= restrictions.bottom) {
      mainPin.style.top = `${position.y}px`;
    }

    assignAddress();
  };

  const onPinUp = (upEvt) => {
    if (evt.button === 1) {
      upEvt.preventDefault();
    }

    document.removeEventListener(`mousemove`, onMouseMotion);
    document.removeEventListener(`mouseup`, onPinUp);
  };

  document.addEventListener(`mousemove`, onMouseMotion);
  document.addEventListener(`mouseup`, onPinUp);
};

window.dragging = {
  onStarterPinMouseMove,
};

