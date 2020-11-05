'use strict';
(() => {
  const {PIN_WIDTH, PIN_HEIGHT, assignAddress, locationXMax, mainPin} = window.starterPin;
  const {map} = window.map;

  const TOP_CURB = 130;
  const BOTTOM_CURB = 630;
  const LEFT_CURB = 0;
  const RIGHT_CURB = locationXMax;

  const restrictions = {
    top: map.offsetTop + TOP_CURB - PIN_HEIGHT,
    bottom: BOTTOM_CURB - PIN_HEIGHT,
    left: LEFT_CURB - PIN_WIDTH,
    right: RIGHT_CURB + Math.round(PIN_WIDTH / 2) - PIN_WIDTH,
  };

  const onStarterPinMouseMove = (evt) => {
    evt.preventDefault();

    let startingPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMovtion = (motionEvt) => {
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

      if (position.x < restrictions.left) {
        position.x = restrictions.left;
      } else if (position.x > restrictions.right) {
        position.x = restrictions.right;
      }

      if (position.y < restrictions.top) {
        position.y = restrictions.top;
      } else if (position.y > restrictions.bottom) {
        position.y = restrictions.bottom;
      }

      mainPin.style.top = `${position.y}px`;
      mainPin.style.left = `${position.x}px`;

      assignAddress();
    };

    const onPinUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMovtion);
      document.removeEventListener(`mouseup`, onPinUp);
    };

    document.addEventListener(`mousemove`, onMouseMovtion);
    document.addEventListener(`mouseup`, onPinUp);
  };

  window.dragging = {
    onStarterPinMouseMove,
  };
})();
