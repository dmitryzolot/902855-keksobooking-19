'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapBlockWidth = mapBlock.offsetWidth;

  //  Добавляем в переменную template пинов
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  //  Добавляем в переменную контейнер для пинов
  var mapPins = document.querySelector('.map__pins');

  // var mainPin = document.querySelector('.map__pin--main');


  // (function () {

  //   var setupMapElement = document.querySelector('.map__overlay');
  //   var mainPin = document.querySelector('.map__pin--main');

  //   mainPin.addEventListener('mousedown', function (evt) {
  //     evt.preventDefault();

  //     var startCoords = {
  //       x: evt.clientX,
  //       y: evt.clientY
  //     };

  //     var dragged = false;

  //     var onMouseMove = function (moveEvt) {
  //       moveEvt.preventDefault();
  //       dragged = true;

  //       var shift = {
  //         x: startCoords.x - moveEvt.clientX,
  //         y: startCoords.y - moveEvt.clientY
  //       };

  //       startCoords = {
  //         x: moveEvt.clientX,
  //         y: moveEvt.clientY
  //       };

  //       mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
  //       mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

  //     };

  //     var onMouseUp = function (upEvt) {
  //       upEvt.preventDefault();

  //       document.removeEventListener('mousemove', onMouseMove);
  //       document.removeEventListener('mouseup', onMouseUp);

  //       if (dragged) {
  //         var onClickPreventDefault = function (clickEvt) {
  //           clickEvt.preventDefault();
  //           mainPin.removeEventListener('click', onClickPreventDefault);
  //         };
  //         mainPin.addEventListener('click', onClickPreventDefault);
  //       }

  //     };

  //     document.addEventListener('mousemove', onMouseMove);
  //     document.addEventListener('mouseup', onMouseUp);

  //   });

  // })();


  var createTemplatePin = function (announcementObject) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = announcementObject.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = announcementObject.location.y - window.data.PIN_HEIGHT + 'px';


    pinElement.querySelector('img').src = announcementObject.author.avatar; pinElement.querySelector('img').alt = announcementObject.announcementTitle;

    pinElement.addEventListener('click', function (evt) {
      var popupElement = document.querySelector('.popup');
      if (evt.target.classList.contains('map__pin--main')) {
        return;
      }
      if (mapBlock.contains(popupElement)) {
        window.card.removeCard();
      }
      window.card.renderCard(announcementObject);

    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.target.classList.contains('map__pin--main')) {
        return;
      }

      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.removeCard();
        window.card.renderCard(announcementObject);
      }
    });

    return pinElement;
  };

  window.renderAnnouncements = function (serverData) {


    // Создаем фрагмент
    var fragment = document.createDocumentFragment();

    // Вызываем функцию добавления свойств объектов в элементы шаблона и записываем её в фрагмент
    for (var i = 0; i < 5; i++) {
      // Добавляем фрагмент на карту
      mapPins.appendChild(fragment);

      fragment.appendChild(createTemplatePin(serverData[i]));
    }
  };

})();
