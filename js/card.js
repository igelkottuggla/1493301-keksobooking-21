'use strict';
const {isEscEvent, roomsWordsEndings, guestsWordsEndings} = window.util;

const accomodationTypes = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`,
};

const chart = document.querySelector(`.map`);
const container = document.querySelector(`.map__filters-container`);
const cardFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector(`#card`).content;

const makeFeatures = (cardFeatures, cardFragments) => {
  cardFeatures.forEach((feature) => {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--${feature}`;
    cardFragments.appendChild(featureElement);
  });
  return cardFragments;
};

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

const nodesChekingVoid = cardTemplate.querySelectorAll(`.map__card > *:not(button):not(img)`);
nodesChekingVoid.forEach((node) => {
  if (!node.innerHTML) {
    node.remove();
  }
});

const makeCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer;
  const {avatar} = data.author;
  const closeButton = cardElement.querySelector(`.popup__close`);
  closeButton.addEventListener(`click`, () => {
    shutBlurb();
  });

  const cardFeaturesContainer = cardElement.querySelector(`.popup__features`);
  cardFeaturesContainer.innerHTML = ``;

  const cardType = cardElement.querySelector(`.popup__type`);
  cardType.textContent = accomodationTypes[type];
  cardElement.querySelector(`.popup__title`).textContent = title;
  cardElement.querySelector(`.popup__text--address`).textContent = address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнат${roomsWordsEndings(rooms)} для ${guests} гост${guestsWordsEndings(guests)}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardFeaturesContainer.appendChild(makeFeatures(features, cardFragment));
  cardElement.querySelector(`.popup__description`).textContent = description;
  renderPhotos(cardElement, photos);
  cardElement.querySelector(`.popup__avatar`).src = avatar;

  chart.insertBefore(cardElement, container);
  return cardElement;
};

const showBlurb = (item) => {
  shutBlurb();
  makeCard(item);
  document.addEventListener(`keydown`, onCardEscClick);
};

const onCardEscClick = (evt) => {
  isEscEvent(evt, shutBlurb);
};

const shutBlurb = () => {
  const card = chart.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
  document.removeEventListener(`keydown`, onCardEscClick);
};

window.card = {
  chart,
  showBlurb,
  shutBlurb,
  container,
};
