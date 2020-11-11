'use strict';
(function () {
  const MAX_AMOUNT_PINS = 5;
  const ANY_VALUE = `any`;
  const {create} = window.pin;
  const {close, map} = window.card;
  const {pinsArea} = window.starterPin;
  const mapFilter = map.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  const PriceRange = {
    MIDDLE: 10000,
    HIGH: 50000,
  };
  const MIDDLE_PRICE_RANGE = PriceRange.MIDDLE;
  const HIGH_PRICE_RANGE = PriceRange.HIGH;

  const KeysForPrices = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
  };

  const LOW_PRICE = KeysForPrices.LOW;
  const MIDDLE_PRICE = KeysForPrices.MIDDLE;
  const HIGH_PRICE = KeysForPrices.HIGH;

  const accomodationType = mapFilter.querySelector(`#housing-type`);
  const accomodationPrice = mapFilter.querySelector(`#housing-price`);
  const accomodationRooms = mapFilter.querySelector(`#housing-rooms`);
  const accomodationGuests = mapFilter.querySelector(`#housing-guests`);
  const accomodationFeatures = mapFilter.querySelector(`.map__features`);

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

    close();
    renewBlurbs(newBlurbs);
  };

  const filterAccomodationType = (blurb) => accomodationType.value === blurb.offer.type || accomodationType.value === ANY_VALUE;

  const filterAccomodationPrice = (blurb) => (accomodationPrice.value === LOW_PRICE && blurb.offer.price < MIDDLE_PRICE_RANGE)
    || (accomodationPrice.value === MIDDLE_PRICE && blurb.offer.price >= MIDDLE_PRICE_RANGE && blurb.offer.price < HIGH_PRICE_RANGE)
    || (accomodationPrice.value === HIGH_PRICE && blurb.offer.price >= HIGH_PRICE_RANGE)
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
    mapFilterSelects,
    mapFilterInputs,
    erasePins,
    onLoad,
    mapFilter,
    onFilterGetBlurbs,
  };
})();
