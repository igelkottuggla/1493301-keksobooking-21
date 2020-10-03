'use strict';
(function () {

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

const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const getRandomArray = function (array) {
  return array.slice(getRandomNumber(0, array.length));
}

const getRandomArrayElement = function (array) {
  return Math.floor(Math.random() * array.length);
}

const getRandomLocation = function () {
  const locationX = getRandomNumber(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
  const locationY = getRandomNumber(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
  return `${locationX}, ${locationY}`;
};

const getPinAdd = function (offersAmount) {
  const pinAddData = [];
  for (var i = 1; i <= OFFERS_AMOUNT; i++) {
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
        price: getRandomNumber(1000, 1000000),
        features: getRandomArray(HOUSE_FEATURES),
        photos: getRandomArray(HOUSE_PHOTOS),
        type: getRandomArrayElement(HOUSE_TYPES),
        checkin: getRandomArrayElement(CHECK_IN),
        checkout: getRandomArrayElement(CHECK_OUT),
      },
    });
  }
  return pinAddData;
};


// Заполняет шаблон для отрисовки пина
const createPinAdd = function (data) {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  data.forEach(function(item) {
    const element = pinTemplate.cloneNode(true);
    const img = element.querySelector(`img`);

    element.style.left = item.location.x + 'px';
    element.style.top = item.location.y + 'px';

    img.src = item.author.avatar;
    img.alt = item.offer.title;

    fragment.append(element);
  });
  return fragment;
};

HOUSES_MAP.classList.remove(`map--faded`);
const pinAdd = getPinAdd();
PINS_AREA.append(createPinAdd(pinAdd));
})();
