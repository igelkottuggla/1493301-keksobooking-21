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

  const renewBlurbs = (data) => {
    erasePins();
    pinsArea.append(create(data.slice(0, MAX_AMOUNT_PINS)));
  };

  const accomodationType = document.querySelector(`#housing-type`);
  let accomodationTypeValue = ` `;
  accomodationType.addEventListener(`change`, () => {
    accomodationTypeValue = accomodationType.value;
    let newBlurbs = [];
    blurbs.forEach((item) => {
      if (accomodationTypeValue === ANY_VALUE || item.offer.type === accomodationTypeValue) {
        newBlurbs.push(item);
      }
    });
    close();
    renewBlurbs(newBlurbs);
  });

  window.map = {
    map,
    mapFilterSelects,
    mapFilterInputs,
    erasePins,
    onLoad,
  };
})();
