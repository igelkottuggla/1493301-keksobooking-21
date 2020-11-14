'use strict';
const template = document.querySelector(`.ad-form`);
const addTitle = template.querySelector(`#title`);
const minTitleLength = addTitle.minLength;


const onAddTitleSetCustomValidity = () => {
  const valueLength = addTitle.value.length;
  if (valueLength < minTitleLength) {
    addTitle.setCustomValidity(`Минимальная длина — 30 символов, ещё ${minTitleLength - valueLength}`);
  } else {
    addTitle.setCustomValidity(``);
  }
  addTitle.reportValidity();
};

const addPrice = template.querySelector(`#price`);

const validatePrice = () => {
  if (addPrice.validity.rangeUnderflow) {
    addPrice.setCustomValidity(`Цена не может быть меньше ${addPrice.min}`);
  } else if (addPrice.validity.rangeOverflow) {
    addPrice.setCustomValidity(`Цена не может быть больше ${addPrice.max}`);
  } else {
    addPrice.setCustomValidity(``);
  }
};

const onInvalidAddPriceCheckValidity = () => {
  validatePrice();
};

const onInputAddPriceCheckValidity = () => {
  validatePrice();
};

const typeCorrToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const setMinPrice = (minPrice) => {
  addPrice.setAttribute(`min`, minPrice);
  addPrice.setAttribute(`placeholder`, minPrice);
};

const accomodationType = template.querySelector(`#type`);
let minPrice = typeCorrToPrice[accomodationType.value];
setMinPrice(minPrice);

const onChangeAccomodationType = () => {
  minPrice = typeCorrToPrice[accomodationType.value];
  setMinPrice(minPrice);
};

onChangeAccomodationType();

const checkIn = template.querySelector(`#timein`);
const checkOut = template.querySelector(`#timeout`);

const changeCheckIn = (value) => {
  checkIn.value = value;
};

const changeCheckOut = (value) => {
  checkOut.value = value;
};

const onChangeCheckIn = () => {
  changeCheckOut(checkIn.value);
};

const onChangeCheckOut = () => {
  changeCheckIn(checkOut.value);
};

const addRoomsAmount = template.querySelector(`#room_number`);
const addGuestsAmount = template.querySelector(`#capacity`);

const capacityRelevance = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`],
};

const setAllowedCapacity = () => {
  let roomsAmount = addRoomsAmount.value;
  let guestsAmount = addGuestsAmount.querySelectorAll(`option`);
  guestsAmount.forEach((option) => {
    option.disabled = capacityRelevance[roomsAmount].indexOf(option.value) === -1;
  });
  if (guestsAmount[addGuestsAmount.selectedIndex].disabled) {
    addGuestsAmount.querySelector(`option:not([disabled])`).selected = true;
  }
};

setAllowedCapacity();

const onChangeAddRoomsAmount = () => {
  setAllowedCapacity();
};

window.form = {
  template,
  addTitle,
  addPrice,
  checkOut,
  checkIn,
  accomodationType,
  setAllowedCapacity,
  addRoomsAmount,
  onAddTitleSetCustomValidity,
  onInvalidAddPriceCheckValidity,
  onInputAddPriceCheckValidity,
  onChangeAccomodationType,
  onChangeCheckIn,
  onChangeCheckOut,
  onChangeAddRoomsAmount,
};
