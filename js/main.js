'use strict';
(function () {
  const MOUSE_MAIN_BUTTON = 0;
  const {map, mapFilterSelects, mapFilterInputs, onError} = window.map;
  const {addForm} = window.form;
  const {assignAddress, mainPin, pinsArea, PIN_INCEPTION_X, PIN_INCEPTION_Y, setMainPinPosition} = window.starterPin;
  const {close} = window.card;
  const {create} = window.pin;
  const {isEnterEvent, isEscEvent} = window.util;
  const {onStarterPinMouseMove} = window.dragging;
  const {load, upload} = window.server;

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
    priorPins.forEach((pin) => {
      pin.remove();
    });
  }

  const onMainPinMouseButtonClick = function (evt) {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activateWholePage();
    }
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const success = successTemplate.cloneNode(true);

  const showSuccessReport = () => {
    map.appendChild(success);

    document.addEventListener(`click`, onBannerSuccessClick);
    document.addEventListener(`keydown`, onBannerSuccessKeyDown);
  };

  const onBannerSuccessClick = () => {
    shutBanner();
  };

  const onBannerSuccessKeyDown = (evt) => {
    isEscEvent(evt, shutBanner);
  };


  const onMainPinPressEnter = (evt) => {
    isEnterEvent(evt, activateWholePage);
  };

  const shutBanner = () => {
    const successMessage = document.querySelector(`.success`);
    successMessage.remove();

    document.removeEventListener(`click`, onBannerSuccessClick);
    document.removeEventListener(`keydown`, onBannerSuccessKeyDown);
  };

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const error = errorTemplate.cloneNode(true);

  const showErrorMessage = function () {
    map.appendChild(error);

    document.addEventListener(`click`, onBannerErrorClick);
    document.addEventListener(`keydown`, onBannerErrorKeyDown);
  };

  const onBannerErrorClick = function () {
    shutBannerError();
  };

  const onBannerErrorKeyDown = function (evt) {
    isEscEvent(evt, shutBannerError);
  };

  const shutBannerError = function () {
    const message = document.querySelector(`.error`);
    message.remove();

    document.removeEventListener(`click`, onBannerErrorClick);
    document.removeEventListener(`keydown`, onBannerErrorKeyDown);
  };

  const resetButton = document.querySelector(`.ad-form__reset`);

  const resetForm = function () {
    deactivateWholePage();
  };

  const deactivateWholePage = function () {
    close();
    erasePins();
    addForm.reset();
    map.classList.add(`map--faded`);
    addForm.classList.add(`ad-form--disabled`);
    assignAddress();
    mainPin.style.left = `${PIN_INCEPTION_X}px`;
    mainPin.style.top = `${PIN_INCEPTION_Y}px`;
    setMainPinPosition();
    imposeDisabled(mapFilterSelects);
    imposeDisabled(mapFilterInputs);
    imposeDisabled(formSelects);
    imposeDisabled(formInputs);
    formTextArea.setAttribute(`disabled`, `true`);
    formSubmit.setAttribute(`disabled`, `true`);
    mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
    resetButton.removeEventListener(`click`, resetForm);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mainPin.addEventListener(`mousedown`, onStarterPinMouseMove);

  const activateWholePage = () => {
    addForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    imposeActive(formSelects);
    imposeActive(formInputs);
    imposeActive(mapFilterSelects);
    imposeActive(mapFilterInputs);
    formTextArea.removeAttribute(`disabled`, `true`);
    formSubmit.removeAttribute(`disabled`, `true`);
    load((data) => {
      pinsArea.append(create(data));
    }, onError);
    assignAddress();

    addForm.addEventListener(`submit`, (evt) => {
      const data = new FormData(addForm);
      const onLoad = () => {
        deactivateWholePage();
        showSuccessReport();
      };

      upload(data, onLoad, showErrorMessage);
      evt.preventDefault();
    });

    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonClick);
    resetButton.addEventListener(`click`, resetForm);
  };
})();
