'use strict';

(function () {

  var mapBlock = document.querySelector('.map');

  var getTextRoom = function (rooms, guests) {
    if (guests > 1) {
      var textGuest = guests + ' гостей';
    } else {
      textGuest = guests + ' гостя';
    }

    if (rooms > 1) {
      var textRoom = rooms + ' комнаты для ' + textGuest;
    } else {
      textRoom = rooms + ' комната для ' + textGuest;
    }
    return textRoom;
  };

  // Добавляем в переменную template карточки
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Функция удаления карточки
  var removeCard = function () {
    var popupElement = document.querySelector('.popup');

    if (popupElement) {
      popupElement.parentNode.removeChild(popupElement);
    }
  };

  // Создаём функцию добавления свойств карточки в разметку
  var createTemplateCard = function (announcementObject) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = announcementObject.title;
    cardElement.querySelector('.popup__text--address').textContent = announcementObject.address;
    cardElement.querySelector('.popup__text--price').textContent = announcementObject.price + 'руб/ночь';
    cardElement.querySelector('.popup__type').textContent = announcementObject.type;
    cardElement.querySelector('.popup__text--capacity').textContent = getTextRoom(announcementObject.roomsNumber, window.data.announcement.guestsNumber);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementObject.checkin + ', ' + 'выезд до ' + announcementObject.checkout;


    var featuresList = cardElement.querySelector('.popup__features');

    featuresList.innerHTML = '<ul class="popup__features"></ul>';

    // Добавляем в очищенный список случайное количество features
    var addFeatures = function (tagName, firstClassName, secondClassName) {
      var featureElement = document.createElement(tagName);
      featureElement.classList.add(firstClassName);
      featureElement.classList.add(secondClassName);
      return featureElement;
    };


    for (var i = 0; i <= announcementObject.features.length - 1; i++) {
      featuresList.appendChild(addFeatures('li', 'popup__feature', 'popup__feature--' + announcementObject.features[i]));
    }


    cardElement.querySelector('.popup__description ').textContent = announcementObject.description;
    cardElement.querySelector('.popup__photos img').src = announcementObject.photos;
    cardElement.querySelector('.popup__avatar').src = announcementObject.author.avatar;
    // Закрытие попапа
    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', removeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        removeCard();
      }
    });
    // console.log(cardElement);
    return cardElement;

  };

  // // Функция добавления карточек на карту перед "map__filters-container"
  // var renderCard = function (announcementData) {
  //   var fragment = document.createDocumentFragment();
  //   var mapFilters = document.querySelector('.map__filters-container');
  //   fragment.appendChild(createTemplateCard(announcementData));
  //   mapBlock.insertBefore(fragment, mapFilters);
  // };


  window.card = {
    renderCard: function (announcementData) {
      var fragment = document.createDocumentFragment();
      var mapFilters = document.querySelector('.map__filters-container');
      fragment.appendChild(createTemplateCard(announcementData));
      mapBlock.insertBefore(fragment, mapFilters);
    },
    removeCard: function () {
      var popupElement = document.querySelector('.popup');

      if (popupElement) {
        popupElement.parentNode.removeChild(popupElement);
      }
    }
  };

})();
