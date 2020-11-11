'use strict';
(function () {
  const TIMEOUT_DEBOUNCE = 500;

  window.debounce = (cb) => {
    let lastTimeout = null;

    return (...argFilterRenew) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        cb(...argFilterRenew);
      }, TIMEOUT_DEBOUNCE);
    };
  };
})();
