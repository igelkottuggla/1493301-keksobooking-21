'use strict';
const MAX_AMOUNT_PINS = 5;
const ANY_VALUE = `any`;
const {create} = window.pin;
const {closeBlurb, map} = window.card;
const {pinsArea} = window.starterPin;
const filter = map.querySelector(`.map__filters`);
const selects = filter.querySelectorAll(`select`);
const inputs = filter.querySelectorAll(`input`);

const PriceRange = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const KeysForPrices = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`,
};

const LOW_PRICE = KeysForPrices.LOW;
const MIDDLE_PRICE = KeysForPrices.MIDDLE;
const HIGH_PRICE = KeysForPrices.HIGH;

const accomodationType = filter.querySelector(`#housing-type`);
const accomodationPrice = filter.querySelector(`#housing-price`);
const accomodationRooms = filter.querySelector(`#housing-rooms`);
const accomodationGuests = filter.querySelector(`#housing-guests`);
const accomodationFeatures = filter.querySelector(`.map__features`);

const erasePins = () => {
  const priorPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  priorPins.forEach((pin) => {
    pin.remove();
  });
};

let blurbs;
const onLoad = (data) => {
  blurbs = data;
  renewBlurbs(data);
};

const renewBlurbs = window.debounce((data) => {
  erasePins();
  pinsArea.append(create(data.slice(0, MAX_AMOUNT_PINS)));
});

const onFilterGetBlurbs = () => {
  const newBlurbs = [];
  blurbs.forEach((blurb) => {
    if (filterAccomodationType(blurb) &&
      filterAccomodationPrice(blurb) &&
      filterAccomodationRooms(blurb) &&
      filterAccomodationGuests(blurb) &&
      filterAccomodationFeatures(blurb)
    ) {
      newBlurbs.push(blurb);
    }
  });

  closeBlurb();
  renewBlurbs(newBlurbs);
};

const filterAccomodationType = (blurb) => accomodationType.value === blurb.offer.type || accomodationType.value === ANY_VALUE;

const filterAccomodationPrice = (blurb) => (accomodationPrice.value === KeysForPrices.LOW && blurb.offer.price < PriceRange.MIDDLE)
  || (accomodationPrice.value === KeysForPrices.MIDDLE && blurb.offer.price >= PriceRange.MIDDLE && blurb.offer.price < PriceRange.HIGH)
  || (accomodationPrice.value === KeysForPrices.HIGH && blurb.offer.price >= PriceRange.HIGH)
  || (accomodationPrice.value === blurb.offer.price
  || accomodationPrice.value === ANY_VALUE);

const filterAccomodationRooms = (blurb) => (+accomodationRooms.value === blurb.offer.rooms)
  || (accomodationRooms.value === ANY_VALUE);

const filterAccomodationGuests = (blurb) => (+accomodationGuests.value === blurb.offer.guests)
  || (accomodationGuests.value === ANY_VALUE);

const filterAccomodationFeatures = (blurb) => {
  const checkedFeatures = accomodationFeatures.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(checkedFeatures).every((checkedFeature) => blurb.offer.features.includes(checkedFeature.value));
};


window.map = {
  map,
  selects,
  inputs,
  erasePins,
  onLoad,
  filter,
  onFilterGetBlurbs,
};
