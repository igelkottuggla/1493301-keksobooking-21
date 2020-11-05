'use strict';
(function () {
  const OFFERS_AMOUNT = 8;
  const HOUSE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const HOUSE_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const CHECK_IN = [`12:00`, `13:00`, `14:00`];
  const CHECK_OUT = [`12:00`, `13:00`, `14:00`];
  const HOUSE_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const PriceRange = {
    MIN: 1000,
    MAX: 1000000
  };

  const {map} = window.map;
  const {getRandomNumber, getRandomItem, getRandomArray, getRandomLocation} = window.util;

  const get = () => {
    const data = [];
    for (let i = 1; i <= OFFERS_AMOUNT; i++) {
      data.push({
        author: {
          avatar: `img/avatars/user0${i}.png`,
        },
        location: {
          x: getRandomNumber(0, map.clientWidth),
          y: getRandomNumber(130, 630),
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
    return data;
  };

  window.data = {
    get,
  };

})();
