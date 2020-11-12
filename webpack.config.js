const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/util.js",
    "./js/form.js",
    "./js/starter-pin.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/debounce.js",
    "./js/images.js",
    "./js/map.js",
    "./js/dragging.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
