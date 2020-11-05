'use strict';
(function () {
  const {open} = window.card;

  const create = (data) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const element = pinTemplate.cloneNode(true);
      const img = element.querySelector(`img`);

      element.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;
      img.src = item.author.avatar;
      img.alt = item.offer.title;

      fragment.append(element);
      element.addEventListener(`click`, () => {
        open(item);
      });
    });

    return fragment;
  };

  window.pin = {
    create,
  };
})();
