'use strict';
const MOUSE_MAIN_BUTTON = 0;
const {selects, inputs, erasePins, onLoad, filter, onFilterGetBlurbs} = window.map;
const {addForm, setAllowedCapacity} = window.form;
const {assignAddress, mainPin, PIN_INCEPTION_X, PIN_INCEPTION_Y, setMainPinPosition} = window.starterPin;
const {closeBlurb, map, container} = window.card;
const {isEnterEvent, isEscEvent, onError} = window.util;
const {onStarterPinMouseMove} = window.dragging;
const {load, upload} = window.server;
const {makePhotosEnabled, makePhotosDisabled} = window.images;
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

container.classList.add(`hidden`);

imposeDisabled(formSelects);
imposeDisabled(formInputs);
imposeDisabled(selects);
imposeDisabled(inputs);
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
  closeBlurb();
  erasePins();
  addForm.reset();
  setAllowedCapacity();
  map.classList.add(`map--faded`);
  addForm.classList.add(`ad-form--disabled`);
  assignAddress();
  mainPin.style.left = `${PIN_INCEPTION_X}px`;
  mainPin.style.top = `${PIN_INCEPTION_Y}px`;
  setMainPinPosition();
  imposeDisabled(selects);
  imposeDisabled(inputs);
  imposeDisabled(formSelects);
  imposeDisabled(formInputs);
  container.classList.add(`hidden`);
  formTextArea.setAttribute(`disabled`, `true`);
  formSubmit.setAttribute(`disabled`, `true`);
  mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
  resetButton.removeEventListener(`click`, resetForm);

  filter.removeEventListener(`change`, onFilterGetBlurbs);
  addTitle.removeEventListener(`input`, onAddTitleSetCustomValidity);
  addPrice.removeEventListener(`input`, onInputAddPriceCheckValidity);
  addPrice.removeEventListener(`invalid`, onInvalidAddPriceCheckValidity);
  accomodationType.removeEventListener(`change`, onChangeAccomodationType);
  checkIn.removeEventListener(`change`, onChangeCheckIn);
  checkOut.removeEventListener(`change`, onChangeCheckOut);
  addRoomsAmount.removeEventListener(`change`, onChangeAddRoomsAmount);
  makePhotosDisabled();
};

mainPin.addEventListener(`mousedown`, onMainPinMouseButtonClick);
mainPin.addEventListener(`keydown`, onMainPinPressEnter);
mainPin.addEventListener(`mousedown`, onStarterPinMouseMove);

const activateWholePage = () => {
  addForm.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  container.classList.remove(`hidden`);
  imposeActive(formSelects);
  imposeActive(formInputs);
  imposeActive(selects);
  imposeActive(inputs);
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

  filter.addEventListener(`change`, onFilterGetBlurbs);
  addTitle.addEventListener(`input`, onAddTitleSetCustomValidity);
  addPrice.addEventListener(`input`, onInputAddPriceCheckValidity);
  addPrice.addEventListener(`invalid`, onInvalidAddPriceCheckValidity);
  accomodationType.addEventListener(`change`, onChangeAccomodationType);
  checkIn.addEventListener(`change`, onChangeCheckIn);
  checkOut.addEventListener(`change`, onChangeCheckOut);
  addRoomsAmount.addEventListener(`change`, onChangeAddRoomsAmount);
  makePhotosEnabled();
};
