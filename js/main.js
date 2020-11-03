'use strict';
(function () {
  const housesMap = document.querySelector(`.map`);
  const pinsArea = document.querySelector(`.map__pins`);
  const OFFERS_AMOUNT = 8;
  const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const HOUSE_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECK_IN = [`12:00`, `13:00`, `14:00`];
  const CHECK_OUT = [`12:00`, `13:00`, `14:00`];
  const HOUSE_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 44;
  const MOUSE_MAIN_BUTTON = 0;

  const PriceRange = {
    MIN: 1000,
    MAX: 1000000
  };

  const PinLocation = {
    X_MIN: 0,
    X_MAX: pinsArea.clientWidth,
    Y_MIN: 130,
    Y_MAX: 630
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const getRandomArray = function (array) {
    return array.slice(getRandomNumber(0, array.length));
  };

  const getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  const getRandomLocation = function () {
    const locationX = getRandomNumber(PinLocation.X_MIN, PinLocation.X_MAX);
    const locationY = getRandomNumber(PinLocation.Y_MIN, PinLocation.Y_MAX);
    return `${locationX}, ${locationY}`;
  };

  const getPinAdd = function () {
    const pinAddData = [];
    for (let i = 1; i <= OFFERS_AMOUNT; i++) {
      pinAddData.push({
        author: {
          avatar: `img/avatars/user0${i}.png`,
        },
        location: {
          x: getRandomNumber(PinLocation.X_MIN, PinLocation.X_MAX),
          y: getRandomNumber(PinLocation.Y_MIN, PinLocation.Y_MAX),
        },
        offer: {
          title: `Отличный вариант для путешествия ...`,
          description: `東京へようこそ`,
          address: getRandomLocation(),
          rooms: getRandomNumber(1, 10),
          guests: getRandomNumber(1, 20),
          price: getRandomNumber(PriceRange.MIN, PriceRange.MAX),
          features: getRandomArray(HOUSE_FEATURES),
          photos: getRandomArray(HOUSE_PHOTOS),
          type: getRandomItem(HOUSE_TYPES),
          checkin: getRandomItem(CHECK_IN),
          checkout: getRandomItem(CHECK_OUT),
        },
      });
    }
    return pinAddData;
  };

  const createPinAdd = function (data) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      const element = pinTemplate.cloneNode(true);
      const img = element.querySelector(`img`);

      element.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;

      img.src = item.author.avatar;
      img.alt = item.offer.title;

      fragment.append(element);
      element.addEventListener(`click`, () => {
        openCard(item);
      });
    });
    return fragment;
  };

  const pinAdd = getPinAdd();

  const makeFeatures = function (cardFeatures, cardFragment) {
    cardFeatures.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.className = `popup__feature popup__feature--${feature}`;
      cardFragment.appendChild(featureElement);
    });
    return cardFragment;
  };

  // Окно информацией об объявлении
  const makeCard = function (data) {
    const cardTemplate = document.querySelector(`#card`).content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardFragment = document.createDocumentFragment();
    const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
    const {avatar} = data.author;
    const closeButton = cardElement.querySelector(`.popup__close`);
    closeButton.addEventListener(`click`, () => {
      closeCard();
    });

    const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);
    cardFeaturesContainer.innerHTML = ``;

    const renderPhotos = (popupPhotos, photosCard) => {
      const cardPhotos = popupPhotos.querySelector(`.popup__photos`);
      const cardPhoto = cardPhotos.querySelector(`.popup__photo`);

      cardPhotos.innerHTML = ``;
      photosCard.forEach((photo) => {
        const newCardPhoto = cardPhoto.cloneNode(true);
        newCardPhoto.src = photo;
        cardFragment.appendChild(newCardPhoto);
      });

      cardPhotos.appendChild(cardFragment);
    };

    const roomsWordsEndings = function (ending) {
      let lastFigure = ending;
      if (ending > 20) {
        lastFigure = ending % 10;
      }
      const endings = {
        0: ``,
        1: `а`,
        2: `ы`,
        3: `ы`,
        4: `ы`,
        5: ``,
        6: ``,
        7: ``,
        8: ``,
        9: ``,
      };
      let result = (ending >= 5 && ending <= 20) ? `` : endings[lastFigure];
      return result;
    };

    const guestsWordsEndings = function (ending) {
      let lastFigure = ending;
      if (ending >= 10) {
        lastFigure = ending % 10;
      }
      let result = (lastFigure === 1) ? `я` : `ей`;
      return result;
    };

    const cardType = cardElement.querySelector(`.popup__type`);

    const Accomodation = {
      FLAT: `flat`,
      BUNGALOW: `bungalow`,
      HOUSE: `house`,
      PALACE: `palace`,
    };

    switch (type) {
      case (Accomodation.FLAT):
        cardType.textContent = `квартира`;
        break;
      case (Accomodation.BUNGALOW):
        cardType.textContent = `бунгало`;
        break;
      case (Accomodation.HOUSE):
        cardType.textContent = `дом`;
        break;
      case (Accomodation.PALACE):
        cardType.textContent = `дворец`;
        break;
    }

    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнат${roomsWordsEndings(rooms)} для ${guests} гост${guestsWordsEndings(guests)}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    cardFeaturesContainer.appendChild(makeFeatures(features, cardFragment));
    cardElement.querySelector(`.popup__description`).textContent = description;
    renderPhotos(cardElement, photos);
    cardElement.querySelector(`.popup__avatar`).src = avatar;
    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    housesMap.insertBefore(cardElement, mapFilterContainer);

    return cardElement;
  };

  const form = document.querySelector(`.ad-form`);
  const formSelects = form.querySelectorAll(`select`);
  const formInputs = form.querySelectorAll(`input`);
  const formTextArea = form.querySelector(`#description`);
  const formSubmit = form.querySelector(`.ad-form__element--submit`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const mainPinsStartPosition = {
    x: Math.floor(mainPin.offsetLeft + PIN_WIDTH / 2),
    y: Math.floor(mainPin.offsetTop + PIN_HEIGHT / 2)
  };

  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

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

  const mainPinAddressInput = form.querySelector(`#address`);

  const setMainPinPosition = function () {
    mainPinAddressInput.value = `${mainPinsStartPosition.x}, ${mainPinsStartPosition.y}`;
  };

  setMainPinPosition();

  const assignAddress = function () {
    const newPinPositionY = Math.floor(mainPin.offsetTop + PIN_HEIGHT);
    mainPinAddressInput.value = `${mainPinsStartPosition.x}, ${newPinPositionY}`;
  };

  mainPinAddressInput.setAttribute(`readonly`, `true`);

  const mainPinMouseButtonClick = function (evt) {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activateWholePage();
      closeCard();
    }
  };

  const CardEscClick = (evt) => {
    if (evt.key === `Escape`) {
      closeCard();
    }
  };

  const openCard = (item) => {
    makeCard(item);
    document.addEventListener(`keydown`, CardEscClick);
  };

  const closeCard = () => {
    const card = housesMap.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
    document.removeEventListener(`keydown`, CardEscClick);
  };

  const mainPinPressEnter = function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      activateWholePage();
    }
  };

  mainPin.addEventListener(`mousedown`, mainPinMouseButtonClick);
  mainPin.addEventListener(`keydown`, mainPinPressEnter);

  function activateWholePage() {
    document.querySelector(`.map`).classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    imposeActive(formSelects);
    imposeActive(formInputs);
    imposeActive(mapFilterSelects);
    imposeActive(mapFilterInputs);
    formTextArea.removeAttribute(`disabled`, `true`);
    formSubmit.removeAttribute(`disabled`, `true`);
    erasePins();
    getPinAdd();
    assignAddress();
    pinsArea.append(createPinAdd(pinAdd));
    mainPin.removeEventListener(`keydown`, mainPinPressEnter);
    mainPin.removeEventListener(`mousedown`, mainPinMouseButtonClick);
  }

  const addTitle = form.querySelector(`#title`);
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

  const addPrice = form.querySelector(`#price`);

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

  const accomodationType = form.querySelector(`#type`);
  let minPrice = typeCorrToPrice[accomodationType.value];
  setMinPrice(minPrice);

  accomodationType.addEventListener(`change`, () => {
    addPrice.value = ``;
    minPrice = typeCorrToPrice[accomodationType.value];
    setMinPrice(minPrice);
  });

  const checkIn = form.querySelector(`#timein`);
  const checkOut = form.querySelector(`#timeout`);

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

  const addRoomsAmount = form.querySelector(`#room_number`);
  const addGuestsAmount = form.querySelector(`#capacity`);

  const capacityRelevance = {
    '1': [`1`],
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': [`0`],
  };

  const setAllowedCapacity = function () {
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
})();
