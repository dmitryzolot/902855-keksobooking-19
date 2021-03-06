'use strict';

(function () {

  var mapBlock = document.querySelector('.map');

  //  Добавляем в переменную template пинов
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  //  Добавляем в переменную контейнер для пинов
  var mapPins = document.querySelector('.map__pins');


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

  window.announcements = [];

  window.renderAnnouncements = function (serverData) {

    window.announcements = serverData;

    // Создаем фрагмент
    var fragment = document.createDocumentFragment();

    // Вызываем функцию добавления свойств объектов в элементы шаблона и записываем её в фрагмент
    for (var i = 0; i < 6; i++) {
      // Добавляем фрагмент на карту
      fragment.appendChild(createTemplatePin(serverData[i]));

      mapPins.appendChild(fragment);

    }
  };

})();
