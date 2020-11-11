'use strict';
(function () {
  const MOUSE_MAIN_BUTTON = 0;
  const {mapFilterSelects, mapFilterInputs, erasePins, onLoad, mapFilter, onFilterGetBlurbs} = window.map;
  const {addForm, setAllowedCapacity} = window.form;
  const {assignAddress, mainPin, PIN_INCEPTION_X, PIN_INCEPTION_Y, setMainPinPosition} = window.starterPin;
  const {close, map, mapFilterContainer} = window.card;
  const {isEnterEvent, isEscEvent, onError} = window.util;
  const {onStarterPinMouseMove} = window.dragging;
  const {load, upload} = window.server;
  const {addTitle, addPrice, checkIn, checkOut, accomodationType, addRoomsAmount, onAddTitleSetCustomValidity, onInvalidAddPriceCheckValidity, onInputAddPriceCheckValidity, onChangeAccomodationType, onChangeCheckIn, onChangeCheckOut, onChangeAddRoomsAmount} = window.form;

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

  mapFilterContainer.classList.add(`hidden`);

  imposeDisabled(formSelects);
  imposeDisabled(formInputs);
  imposeDisabled(mapFilterSelects);
  imposeDisabled(mapFilterInputs);
  formTextArea.setAttribute(`disabled`, `true`);
  formSubmit.setAttribute(`disabled`, `true`);

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
    success.remove();

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
    error.remove();

    document.removeEventListener(`click`, onBannerErrorClick);
    document.removeEventListener(`keydown`, onBannerErrorKeyDown);
  };

  const resetButton = document.querySelector(`.ad-form__reset`);

  const resetForm = () => {
    deactivateWholePage();
  };

  const deactivateWholePage = function () {
    close();
    erasePins();
    addForm.reset();
    setAllowedCapacity();
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
    mapFilterContainer.classList.add(`hidden`);
    formTextArea.setAttribute(`disabled`, `true`);
    formSubmit.setAttribute(`disabled`, `true`);
    mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
    resetButton.removeEventListener(`click`, resetForm);

    mapFilter.removeEventListener(`change`, onFilterGetBlurbs);
    addTitle.removeEventListener(`input`, onAddTitleSetCustomValidity);
    addPrice.removeEventListener(`input`, onInputAddPriceCheckValidity);
    addPrice.removeEventListener(`invalid`, onInvalidAddPriceCheckValidity);
    accomodationType.removeEventListener(`change`, onChangeAccomodationType);
    checkIn.removeEventListener(`change`, onChangeCheckIn);
    checkOut.removeEventListener(`change`, onChangeCheckOut);
    addRoomsAmount.removeEventListener(`change`, onChangeAddRoomsAmount);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
  mainPin.addEventListener(`keydown`, onMainPinPressEnter);
  mainPin.addEventListener(`mousedown`, onStarterPinMouseMove);

  const activateWholePage = () => {
    addForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    mapFilterContainer.classList.remove(`hidden`);
    imposeActive(formSelects);
    imposeActive(formInputs);
    imposeActive(mapFilterSelects);
    imposeActive(mapFilterInputs);
    formTextArea.removeAttribute(`disabled`, `true`);
    formSubmit.removeAttribute(`disabled`, `true`);
    assignAddress();
    load(onLoad, onError);

    addForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const data = new FormData(addForm);
      upload(data, () => {
        deactivateWholePage();
        showSuccessReport();
      },
      showErrorMessage);
      document.activeElement.blur();
    });

    mainPin.removeEventListener(`keydown`, onMainPinPressEnter);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseButtonClick);
    resetButton.addEventListener(`click`, resetForm);

    mapFilter.addEventListener(`change`, onFilterGetBlurbs);
    addTitle.addEventListener(`input`, onAddTitleSetCustomValidity);
    addPrice.addEventListener(`input`, onInputAddPriceCheckValidity);
    addPrice.addEventListener(`invalid`, onInvalidAddPriceCheckValidity);
    accomodationType.addEventListener(`change`, onChangeAccomodationType);
    checkIn.addEventListener(`change`, onChangeCheckIn);
    checkOut.addEventListener(`change`, onChangeCheckOut);
    addRoomsAmount.addEventListener(`change`, onChangeAddRoomsAmount);
  };
})();
