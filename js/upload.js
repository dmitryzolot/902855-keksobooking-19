'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPin = document.querySelector('.map__pin');
  var uploadMap = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var formFieldsets = document.querySelectorAll('.ad-form__element');

  // Форма фильтров
  var mapFiltersForm = document.querySelector('.map__filters');

  // Форма объявления
  var adForm = document.querySelector('.ad-form');

  // Элементы input, select, textarea на которых будет добавляться и удаляться атрибут disabled
  var mapFiltersElements = mapFiltersForm.elements;
  var adFormElements = adForm.elements;

  // Функция добавляения и удаления атрибута disabled на элементах
  var addDisabledAttribute = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  // // Добавление по умолчанию атрибута disabled
  // addDisabledAttribute(mapFiltersElements, true);
  // addDisabledAttribute(adFormElements, true);


  // Отображение и скрытие сообщения об отправке формы
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var successMessageText = successMessage.querySelector('.success__message');

  window.util.mainPage.appendChild(successMessage);

  successMessage.classList.add('hidden');


  // Функции закрытия сообщения об отправке
  var successMessageClickHandler = function (evt) {
    if (evt.target !== successMessageText) {
      window.util.hideMessage(successMessage, successMessageClickHandler, successDocumentKeydownHandler);
    }
  };

  var successDocumentKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.util.hideMessage(successMessage, successMessageClickHandler, successDocumentKeydownHandler);
    }
  };


  // Функция показа сообщения об успешной отправке данных
  var onSuccess = function () {
    successMessage.classList.remove('hidden');

    successMessage.addEventListener('click', successMessageClickHandler);
    document.addEventListener('keydown', successDocumentKeydownHandler);

    mainForm.setAttribute('disabled', 'disabled');
    mainForm.classList.add('ad-form--disabled');
    formFieldsets.forEach(function (filter) {
      filter.setAttribute('disabled', 'disabled');
    });

  };


  // Функция возврата страницы в исходное состояиние
  var setPageInitialState = function () {
    // Скрытие карты
    uploadMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    // // // Блокировка формы
    // addDisabledAttribute(window.upload.mapFiltersElements, true);
    // addDisabledAttribute(window.upload.adFormElements, true);

    // Установка метки в начальное положение
    mainPin.style.left = window.pinMove.pinInitialCoords.X + 'px';
    mainPin.style.top = window.pinMove.pinInitialCoords.Y + 'px';

    // // Возвращение обработчиков событий на главный пин
    // window.mainPin.addEventListener('keydown', window.window.mainPin.mainpinHandler);
    // window.mainPin.addEventListener('mousedown', window.window.mainPin.mainpinHandler);

    // Удаление пинов (кроме главного пина)
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });


    // Удаление карточки

    window.card.removeCard();


    // Сброс значений форм
    mapFiltersForm.reset();
    adForm.reset();

    // // Удаление превью аватара и фото жилья
    // window.image.avatarPreview.src = 'img/muffin-grey.svg';
    // window.image.offerPreview.style.background = '';

    // // Установка в форму адреса начальных координат центра метки
    // window.shift.setAddressValue(window.shift.pinCenterInitialCoords.x, window.shift.pinCenterInitialCoords.y);
  };


  // Отпавка данных формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(adForm), onSuccess, window.data.onError);
    setPageInitialState();
  });


  // Нажатие на кнопку перезагрузки страницы
  var resetFormButton = document.querySelector('.ad-form__reset');
  resetFormButton.addEventListener('click', setPageInitialState);


  window.upload = {
    adForm: adForm,
    mapFiltersElements: mapFiltersElements,
    adFormElements: adFormElements,
    // addDisabledAttribute: addDisabledAttribute,
    setPageInitialState: setPageInitialState
  };


})();
