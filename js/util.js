'use strict';

window.util = {

  ESC_KEYCODE: 27,
  ENTER_KEYCODE: 13,

  isKeyEvent: function (evt, key, action) {
    if (evt.key === key) {
      action();
    }
  },

  getRandomElement: function (array) {
    var random = Math.floor(Math.random() * array.length); return array[random];
  },

  getRandomInteger: function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

};


