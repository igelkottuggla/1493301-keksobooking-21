'use strict';
(function () {
  const MOUSE_MAIN_BUTTON = 0;
  const {map, mapFilterSelects, mapFilterInputs} = window.map;
  const {addForm} = window.form;
  const {assignAddress, mainPin, pinsArea} = window.starterPin;
  const {close} = window.card;
  const {create} = window.pin;
  const {get} = window.data;
  const {isEnterEvent} = window.util;

  const formSelects = addForm.querySelectorAll(`select`);
  const formInputs = addForm.querySelectorAll(`input`);
  const formTextArea = addForm.querySelector(`#description`);
  const formSubmit = addForm.querySelector(`.ad-form__element--submit`);

  const imposeDisabled = function (elements) {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
  };

  const imposeActive = function (elements) {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`, `true`);
    });
  };

  imposeDisabled(formSelects);
  imposeDisabled(formInputs);
  imposeDisabled(mapFilterSelects);
  imposeDisabled(mapFilterInputs);
  formTextArea.setAttribute(`disabled`, `true`);
  formSubmit.setAttribute(`disabled`, `true`);

  function erasePins() {
    const priorPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (priorPins) {
      priorPins.forEach((pin) => {
        pin.parentNode.removeChild(pin);
      });
    }
  }

  const onMainPinMouseButtonClick = function (evt) {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activateWholePage();
      close();
    }
  };

  const onMainPinPressEnter = (evt) => {
    isEnterEvent(evt, activateWholePage);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);

  const activateWholePage = () => {
    addForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    imposeActive(formSelects);
    imposeActive(formInputs);
    imposeActive(mapFilterSelects);
    imposeActive(mapFilterInputs);
    formTextArea.removeAttribute(`disabled`, `true`);
    formSubmit.removeAttribute(`disabled`, `true`);
    erasePins();
    const pin = get();
    pinsArea.append(create(pin));
    assignAddress();
    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonClick);
  };
})();
