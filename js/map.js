'use strict';
(function () {
  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterSelects = mapFilter.querySelectorAll(`select`);
  const mapFilterInputs = mapFilter.querySelectorAll(`input`);

  window.map = {
    map,
    mapFilterSelects,
    mapFilterInputs,
  };
})();
