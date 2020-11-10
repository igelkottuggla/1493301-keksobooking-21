'use strict';
(function () {
  const addForm = document.querySelector(`.ad-form`);
  const addTitle = addForm.querySelector(`#title`);
  const minTitleLength = addTitle.minLength;


  addTitle.addEventListener(`input`, () => {
    let valueLength = addTitle.value.length;
    if (valueLength < minTitleLength) {
      addTitle.setCustomValidity(`Минимальная длина — 30 символов, ещё ${minTitleLength - valueLength}`);
    } else {
      addTitle.setCustomValidity(``);
    }
    addTitle.reportValidity();
  });

  const addPrice = addForm.querySelector(`#price`);

  const validatePrice = () => {
    if (addPrice.validity.rangeUnderflow) {
      addPrice.setCustomValidity(`Цена не может быть меньше ${addPrice.min}`);
    } else if (addPrice.validity.rangeOverflow) {
      addPrice.setCustomValidity(`Цена не может быть больше ${addPrice.max}`);
    } else {
      addPrice.setCustomValidity(``);
    }
  };

  addPrice.addEventListener(`invalid`, () => {
    validatePrice();
  });

  addPrice.addEventListener(`input`, () => {
    validatePrice();
  });

  const typeCorrToPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  const setMinPrice = function (minPrice) {
    addPrice.setAttribute(`min`, minPrice);
    addPrice.setAttribute(`placeholder`, minPrice);
  };

  const accomodationType = addForm.querySelector(`#type`);
  let minPrice = typeCorrToPrice[accomodationType.value];
  setMinPrice(minPrice);

  accomodationType.addEventListener(`change`, () => {
    minPrice = typeCorrToPrice[accomodationType.value];
    setMinPrice(minPrice);
  });

  const checkIn = addForm.querySelector(`#timein`);
  const checkOut = addForm.querySelector(`#timeout`);

  const changeCheckIn = (value) => {
    checkIn.value = value;
  };

  const changeCheckOut = (value) => {
    checkOut.value = value;
  };

  checkIn.addEventListener(`change`, () => {
    changeCheckOut(checkIn.value);
  });

  checkOut.addEventListener(`change`, () => {
    changeCheckIn(checkOut.value);
  });

  const addRoomsAmount = addForm.querySelector(`#room_number`);
  const addGuestsAmount = addForm.querySelector(`#capacity`);

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
      if (capacityRelevance[roomsAmount].indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
    if (guestsAmount[addGuestsAmount.selectedIndex].disabled) {
      addGuestsAmount.querySelector(`option:not([disabled])`).selected = true;
    }
  };

  setAllowedCapacity();

  addRoomsAmount.addEventListener(`change`, () => {
    setAllowedCapacity();
  });

  window.form = {
    addForm,
    setAllowedCapacity,
  };
})();
