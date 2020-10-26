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

  // пишет перечисление
  const PriceRange = {
    MIN: 1000,
    MAX: 50000
  };

  // пишет перечисление
  const PinLocation = {
    X_MIN: 0,
    X_MAX: pinsArea.clientWidth,
    Y_MIN: 130,
    Y_MAX: 630
  };

  const OfferRus = {
    PALACE: `Дворец`,
    FLAT: `Квартира`,
    HOUSE: `Дом`,
    BUNGALOW: `Бунгало`
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const getRandomArray = function (array) {
    return array.slice(getRandomNumber(0, array.length));
  };

  //  вносит правки по заменаниям (переименование функции и аргумента)
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

      element.style.left = item.location.x - PIN_WIDTH / 2 + `px`;
      element.style.top = item.location.y - PIN_HEIGHT + `px`;

      img.src = item.author.avatar;
      img.alt = item.offer.title;

      fragment.append(element);
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

    cardElement.querySelector(`.popup__type`).textContent = type ? OfferRus[type] : ``;
    cardElement.querySelector(`.popup__title`).textContent = title;
    cardElement.querySelector(`.popup__text--address`).textContent = address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    cardFeaturesContainer.appendChild(makeFeatures(features, cardFragment));
    cardElement.querySelector(`.popup__description`).textContent = description;
    renderPhotos(cardElement, photos);
    cardElement.querySelector(`.popup__avatar`).src = avatar;


    return cardElement;
  };

  const mapFilterContainer = document.querySelector(`.map__filters-container`);


  const form = document.querySelector(`.ad-form`);
  const formDisabled = document.querySelectorAll(`.ad-form--disabled fieldset`);
  const mapFilter = document.querySelector(`.map__filters`).children;

  formDisabled.forEach((element) => element.setAttribute(`disabled`, `disabled`));

  for (let i = 0; i < mapFilter.length; i++) {
    mapFilter[i].setAttribute(`disabled`, `disabled`);
  }

  const mainPin = document.querySelector(`.map__pin--main`);

  function activateForm() {
    document.querySelector(`.map`).classList.remove(`map--faded`);
    for (let i = 0; i < mapFilter.length; i++) {
      mapFilter[i].removeAttribute(`disabled`);
    }
    form.classList.remove(`ad-form--disabled`);
    formDisabled.forEach((element) => element.removeAttribute(`disabled`));
    pinsArea.append(createPinAdd(pinAdd));
    housesMap.insertBefore(makeCard(pinAdd[0]), mapFilterContainer);
  }

  const addressInput = document.getElementsByName(`address`);
  addressInput[0].setAttribute(`readonly`, `readonly`);
  addressInput[0].value = PIN_WIDTH / 2 + Number(mainPin.style.left.slice(0, -2)) + `, ` + (PIN_WIDTH / 2 + Number(mainPin.style.top.slice(0, -2)));


  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activateForm();
      addressInput[0].value = PIN_WIDTH / 2 + Number(mainPin.style.left.slice(0, -2)) + `, ` + (PIN_HEIGHT + Number(mainPin.style.top.slice(0, -2)));
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activateForm();
      addressInput[0].value = PIN_WIDTH / 2 + Number(mainPin.style.left.slice(0, -2)) + `, ` + (PIN_HEIGHT + Number(mainPin.style.top.slice(0, -2)));
    }
  });

  const addRoomsAmount = document.querySelector(`#room_number`);
  const addGuestsAmount = document.querySelector(`#capacity`);

  const checkRoomsNumber = function (roomsAmount) {
    switch (roomsAmount) {
      case `1`:
        roomsAmount = 1;
        break;
      case `2`:
        roomsAmount = 2;
        break;
      case `3`:
        roomsAmount = 3;
        break;
      case `100`:
        roomsAmount = 100;
        break;
    }
    return roomsAmount;
  };

  const checkGuestsNumber = function (guestsAmount) {
    switch (guestsAmount) {
      case `1`:
        guestsAmount = 1;
        break;
      case `2`:
        guestsAmount = 2;
        break;
      case `3`:
        guestsAmount = 3;
        break;
      case `0`:
        guestsAmount = 100;
        break;
    }
    return guestsAmount;
  };

  const checkGuestsValidity = function (roomsAmount, guestsAmount) {
    switch (roomsAmount) {
      case 1:
        if (!(roomsAmount === guestsAmount)) {
          addGuestsAmount.setCustomValidity(`1 комната для 1 гостя`);
        } else {
          addGuestsAmount.setCustomValidity(``);
        }
        break;
      case 2:
        if (!(roomsAmount >= guestsAmount)) {
          addGuestsAmount.setCustomValidity(`2 комнаты для 2 гостей или для 1 гостя`);
        } else {
          addGuestsAmount.setCustomValidity(``);
        }
        break;
      case 3:
        if (!(roomsAmount >= guestsAmount)) {
          addGuestsAmount.setCustomValidity(`3 комнаты для 3 гостей, для 2 гостей или для 1 гостя`);
        } else {
          addGuestsAmount.setCustomValidity(``);
        }
        break;
      case 100:
        if (!(roomsAmount === guestsAmount)) {
          addGuestsAmount.setCustomValidity(`не для гостей`);
        } else {
          addGuestsAmount.setCustomValidity(``);
        }
    }
  };

  const setGuestsValidity = function () {
    const roomsNumber = checkRoomsNumber(addRoomsAmount.value);
    const guestsNumber = checkGuestsNumber(addGuestsAmount.value);
    return checkGuestsValidity(roomsNumber, guestsNumber);
  };

  setGuestsValidity();

  addRoomsAmount.addEventListener(`change`, () => {
    setGuestsValidity();
  });

  addGuestsAmount.addEventListener(`change`, () => {
    setGuestsValidity();
  });
})();
