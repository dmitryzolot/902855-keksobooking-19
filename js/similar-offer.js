'use strict';

(function () {

  // Задаём размеры пина
  var PIN_WIDTH = 62;

  var PIN_HEIGHT = 84;

  // Контейнер для пинов
  var mapPins = document.querySelector('.map__pins');

  //  template пинов
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // Функции удаления карточки
  var tryRemoveCard = function () {
    var popupElement = document.querySelector('.popup');
    if (popupElement) {
      popupElement.remove();
    }
  };

  var tryRemoveCardEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      tryRemoveCard();
    }
  };


  // Функция добавления свойств пинов в разметку
  var createPinTemplate = function (offerObject) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offerObject.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = offerObject.location.y - PIN_HEIGHT + 'px';

    pinElement.querySelector('img').src = offerObject.author.avatar; pinElement.querySelector('img').alt = offerObject.offer.title;

    // Добавление и удаление карточки по клику на пин
    pinElement.addEventListener('click', function () {
      tryRemoveCard();
      window.card.renderCard(offerObject);
    });

    return pinElement;
  };


  // Функция добавления пинов в контейнер
  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(createPinTemplate(offer));
      mapPins.appendChild(fragment);
    });
  };


  window.similarOffer = {
    mapPins: mapPins,
    tryRemoveCard: tryRemoveCard,
    tryRemoveCardEsc: tryRemoveCardEsc,
    renderPins: renderPins
  };

})();
