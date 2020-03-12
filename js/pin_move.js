'use strict';

/* eslint-enable */

(function () {

  var mainPin = document.querySelector('.map__pin--main');

  // Начальные координаты пина
  var pinInitialCoords = {
    X: 570,
    Y: 375
  };

  // Размеры пина
  var pinSize = {
    WIDTH: 65,
    HEIGTH: 65
  };

  // Высота кончика пина
  var MAIN_PIN_TIP_HEIGHT = 22;

  // Координаты положения центра пина в неативном состоянии
  var pinCenterInitialCoords = {
    x: Math.floor(pinInitialCoords.X + pinSize.WIDTH / 2),
    y: Math.floor(pinInitialCoords.Y + pinSize.HEIGTH / 2)
  };

  // Границы перемещения пина
  var mapBorders = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: 0,
    RIGHT: 1200
  };

  // Поле с адресом
  var addressInput = document.querySelector('#address');


  // Функция нахождения координат кончика пина
  var getPinTipCoords = function (x, y) {
    return {
      x: mainPin.offsetLeft + x + Math.floor(pinSize.WIDTH / 2),
      y: mainPin.offsetTop + y + pinSize.HEIGTH + MAIN_PIN_TIP_HEIGHT
    };
  };


  // Функция установки координат в форме
  var setAddressValue = function (coordsX, coordsY) {
    addressInput.value = coordsX + ', ' + coordsY;
  };


  // Устанавливаем в поле адреса начальные кординаты центра пина
  setAddressValue(pinCenterInitialCoords.x, pinCenterInitialCoords.y);


  // Перемещение пина
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // здесь дописать логику для клика

    // Задаём начальные координаты точки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHadler = function (moveEvt) {
      moveEvt.preventDefault();

      // Обновление смещения относительно первоначальной точки

      // Количество пикселей, на которое произошло смещение
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      // Обновление стартовых координат
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Координаты кончика пина
      var tipCoords = getPinTipCoords(shift.x, shift.y);

      // Задаём границы перемещения пина
      if (tipCoords.x <= mapBorders.RIGHT && tipCoords.x >= mapBorders.LEFT) {
        mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
      }

      if (tipCoords.y <= mapBorders.BOTTOM && tipCoords.y >= mapBorders.TOP) {
        mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
      }

      // Устанавливаем в поле адреса значение кончика пина
      setAddressValue(parseInt(mainPin.style.left, 10) + Math.floor(pinSize.WIDTH / 2), parseInt(mainPin.style.top, 10) + pinSize.HEIGTH + MAIN_PIN_TIP_HEIGHT);
    };

    // При отпускании кнопки мыши прекращаем слушать события движения мыши
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.activatePage();
      setAddressValue(parseInt(mainPin.style.left, 10) + Math.floor(pinSize.WIDTH / 2), parseInt(mainPin.style.top, 10) + pinSize.HEIGTH + MAIN_PIN_TIP_HEIGHT);
      document.removeEventListener('mousemove', mouseMoveHadler);
      document.removeEventListener('mouseup', mouseUpHandler);

    };

    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', mouseMoveHadler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  window.pinMove = {
    pinInitialCoords: pinInitialCoords,
    pinSize: pinSize,
    MAIN_PIN_TIP_HEIGHT: MAIN_PIN_TIP_HEIGHT,
    setAddressValue: setAddressValue,
    getPinTipCoords: getPinTipCoords
  };


  //   var mainPinMouseDownHandler = function () {


  //     // Устанавливаем координаты кончика пина при нажатии на него
  //     var pinTipInitialCoords = {
  //       x: window.pinMove.pinInitialCoords.X + Math.floor(window.pinMove.pinSize.WIDTH / 2),
  //       y: window.pinMove.pinInitialCoords.Y + window.pinMove.pinSize.HEIGTH + window.pinMove.MAIN_PIN_TIP_HEIGHT
  //     };

  //     window.pinMove.setAddressValue(pinTipInitialCoords.x, pinTipInitialCoords.y);
  //   };

  //   mainPinMouseDownHandler();

})();
