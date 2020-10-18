'use strict';
(function () {
  //  Константы
  const HOUSES_MAP = document.querySelector(`.map`);
  const PINS_AREA = document.querySelector(`.map__pins`);
  const OFFERS_AMOUNT = 8;
  const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const HOUSE_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECK_IN = [`12:00`, `13:00`, `14:00`];
  const CHECK_OUT = [`12:00`, `13:00`, `14:00`];
  const HOUSE_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_LOCATION_X_MIN = 0;
  const PIN_LOCATION_X_MAX = PINS_AREA.clientWidth;
  const PIN_LOCATION_Y_MIN = 130;
  const PIN_LOCATION_Y_MAX = 630;
  const PRICE_MIN = 1000;
  const PRICE_MAX = 15000;
  const OFFER_RUS = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };



  //  случайное число в интервале от min до max
  const getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  //  новый массив случайной длины
  const getRandomArray = function (index) {
    return index.slice(getRandomNumber(0, index.length));
  };


  //  возвращние случайного индекса элемента массива
  const getRandomInt = function (index) {
    return index[Math.floor(Math.random() * index.length)];
  };

  //  случайное положение pinа
  const getRandomLocation = function () {
    const locationX = getRandomNumber(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
    const locationY = getRandomNumber(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
    return `${locationX}, ${locationY}`;
  };

  //  массив из сгенерированных объектов
  const getPinAdd = function () {
    const pinAddData = [];
    for (let i = 1; i <= OFFERS_AMOUNT; i++) {
      pinAddData.push({
        author: {
          avatar: `img/avatars/user0${i}.png`,
        },
        location: {
          x: getRandomNumber(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX),
          y: getRandomNumber(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX),
        },
        offer: {
          title: `Заголовок`,
          description: `東京へようこそ`,
          address: getRandomLocation(),
          rooms: getRandomNumber(1, 10),
          guests: getRandomNumber(1, 20),
          price: getRandomNumber(PRICE_MIN, PRICE_MAX),
          features: getRandomArray(HOUSE_FEATURES),
          photos: getRandomArray(HOUSE_PHOTOS),
          type: getRandomInt(HOUSE_TYPES),
          checkin: getRandomInt(CHECK_IN),
          checkout: getRandomInt(CHECK_OUT),
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

      element.style.left = item.location.x + `px`;
      element.style.top = item.location.y + `px`;

      img.src = item.author.avatar;
      img.alt = item.offer.title;

      fragment.append(element);
    });
    return fragment;
  };

  //  отрисовка pinов в DOM
  HOUSES_MAP.classList.remove(`map--faded`);
  const pinAdd = getPinAdd();
  PINS_AREA.append(createPinAdd(pinAdd));


  // спискок с удобствами
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

    const cardType = cardElement.querySelector(`.popup__type`);
    cardElement.querySelector(`.popup__type`).textContent = type ? OFFER_RUS[type] : ``;
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

  const MAP_FILTER_CONTAINER = document.querySelector(`.map__filters-container`);
  HOUSES_MAP.insertBefore(makeCard(pinAdd[0]), MAP_FILTER_CONTAINER);
})();

