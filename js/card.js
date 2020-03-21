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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };


  // Функция добавления фото
  var addPhotos = function (tagName, imgSrc, className, width, height, alt) {
    var element = document.createElement(tagName);
    element.setAttribute('src', imgSrc);
    element.classList.add = className;
    element.setAttribute('width', width);
    element.setAttribute('height', height);
    element.alt = alt;

    return element;
  };

  // Функция добавления features
  var addFeatures = function (tagName, firstClassName, secondClassName) {
    var featureElement = document.createElement(tagName);
    featureElement.classList.add(firstClassName);
    featureElement.classList.add(secondClassName);

    return featureElement;
  };

  // Создаём функцию добавления свойств карточки в разметку
  var createTemplateCard = function (announcementObject) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = announcementObject.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcementObject.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcementObject.offer.price + 'руб/ночь';
    cardElement.querySelector('.popup__type').textContent = announcementObject.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = getTextRoom(announcementObject.offer.rooms, announcementObject.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementObject.offer.checkin + ', ' + 'выезд до ' + announcementObject.offer.checkout;


    // Features
    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '<ul class="popup__features"></ul>';
    announcementObject.offer.features.forEach(function (feature) {
      featuresList.appendChild(addFeatures('li', 'popup__feature', 'popup__feature--' + feature));
    });


    cardElement.querySelector('.popup__description ').textContent = announcementObject.description;
    var photosContainer = cardElement.querySelector('.popup__photos');
    photosContainer.innerHTML = '';
    announcementObject.offer.photos.forEach(function (photo) {
      photosContainer.appendChild(addPhotos('img', photo, 'popup__photo', '45', '40,', 'Фотография жилья'));
    });
    cardElement.querySelector('.popup__avatar').src = announcementObject.author.avatar;
    // Закрытие попапа
    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', removeCard);

    document.addEventListener('keydown', onPopupEscPress);
    return cardElement;

  };

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
