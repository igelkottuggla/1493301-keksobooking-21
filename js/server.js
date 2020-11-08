'use strict';
(function () {
  const GET_FROM_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const POST_TO_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT = 10000;
  const statusCode = {
    OK: 200,
  };

  const createRequest = function (makeLoad, showError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        makeLoad(xhr.response);
      } else {
        showError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      showError(`Произошла ошибка соединения! Проверьте подключение к интернету и повторите попытку позже`);
    });

    xhr.addEventListener(`timeout`, () => {
      showError(`Запрос на получение данных не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  const load = (onLoad, onError) => {
    const xhr = createRequest(onLoad, onError);
    xhr.open(`GET`, GET_FROM_URL);
    xhr.send();
  };

  const upload = (data, onLoad, onError) => {
    const xhr = createRequest(onLoad, onError);
    xhr.open(`POST`, POST_TO_URL);
    xhr.send(data);
  };

  window.server = {
    load,
    upload,
  };
})();
