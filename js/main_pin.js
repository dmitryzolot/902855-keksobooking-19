'use strict';

/* eslint-enable */

(function () {

  // Находим главный пин
  var mainPin = document.querySelector('.map__pin--main');

  // Создаем обработчик события для пина
  var mainpinHandler = function () {
    window.card.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.addDisabledAttribute(window.form.mapFiltersElements, false);
    window.form.addDisabledAttribute(window.form.adFormElements, false);

    // Вызываем функцию добавления пинов в контейнер
    window.backend.fetchData(window.pins.renderPins, function () {});

    // Удаляем обработчики событий
    // mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
    // mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
  };


  var mainPinKeyDownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      mainpinHandler();
    }
  };

  // Создаем обработчик события keydown для пина
  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  var mainPinMouseDownHandler = function () {
    mainpinHandler();

    // Устанавливаем координаты кончика пина при нажатии на него
    var pinTipInitialCoords = {
      x: window.pinMove.pinInitialCoords.X + Math.floor(window.pinMove.pinSize.WIDTH / 2),
      y: window.pinMove.pinInitialCoords.Y + window.pinMove.pinSize.HEIGTH + window.pinMove.MAIN_PIN_TIP_HEIGHT
    };

    window.pinMove.setAddressValue(pinTipInitialCoords.x, pinTipInitialCoords.y);
  };

  // Создаем обработчик события mousedown для пина для отприсовки карточек
  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);


  window.mainPin = {
    mainPin: mainPin,
    mainpinHandler: mainpinHandler
  };
})();
