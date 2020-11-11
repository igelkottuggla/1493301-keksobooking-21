'use strict';
const {isEscEvent} = window.util;
const map = document.querySelector(`.map`);
const container = document.querySelector(`.map__filters-container`);

const makeFeatures = function (cardFeatures, cardFragment) {
  cardFeatures.forEach((feature) => {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--${feature}`;
    cardFragment.appendChild(featureElement);
  });
  return cardFragment;
};

const makeCard = function (data) {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardFragment = document.createDocumentFragment();
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
  const {avatar} = data.author;
  const closeButton = cardElement.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, () => {
    closeBlurb();
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

  const cardType = cardElement.querySelector(`.popup__type`);
  const accomodationTypes = {
    flat: `квартира`,
    bungalow: `бунгало`,
    house: `дом`,
    palace: `дворец`,
  };
  cardType.textContent = accomodationTypes[type];

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
    return (ending >= 5 && ending <= 20) ? `` : endings[lastFigure];
  };

  const guestsWordsEndings = function (ending) {
    let lastFigure = ending;
    if (ending >= 10) {
      lastFigure = ending % 10;
    }

    return (lastFigure === 1) ? `я` : `ей`;
  };

  cardElement.querySelector(`.popup__title`).textContent = title;
  cardElement.querySelector(`.popup__text--address`).textContent = address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнат${roomsWordsEndings(rooms)} для ${guests} гост${guestsWordsEndings(guests)}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardFeaturesContainer.appendChild(makeFeatures(features, cardFragment));
  cardElement.querySelector(`.popup__description`).textContent = description;
  renderPhotos(cardElement, photos);
  cardElement.querySelector(`.popup__avatar`).src = avatar;
  map.insertBefore(cardElement, mapFilterContainer);
  return cardElement;
};

const showBlurb = (item) => {
  closeBlurb();
  makeCard(item);
  document.addEventListener(`keydown`, onCardEscClick);
};

const onCardEscClick = (evt) => {
  isEscEvent(evt, closeBlurb);
};

const closeBlurb = () => {
  const card = map.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  document.removeEventListener(`keydown`, onCardEscClick);
};

window.card = {
  map,
  showBlurb,
  closeBlurb,
  container,
};
