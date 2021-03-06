'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var formFieldsets = document.querySelectorAll('.ad-form__element');
  var mainForm = document.querySelector('.ad-form');
  var priceFieldDefaultPlaceholder = '1000';

  var mapOptionFilters = document.querySelectorAll('.map__filter');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');

  var mainPin = document.querySelector('.map__pin--main');
  var priceField = document.querySelector('#price');

  formFieldsets.forEach(function (filter) {
    filter.setAttribute('disabled', 'disabled');
  });

  var activatePage = function () {
    formFieldsets.forEach(function (filter) {
      filter.removeAttribute('disabled', 'disabled');
    });
    mapOptionFilters.forEach(function (filter) {
      filter.removeAttribute('disabled', 'disabled');
    });
    mapCheckboxes.forEach(function (checkbox) {
      checkbox.removeAttribute('disabled', 'disabled');
    });
    mapBlock.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    // Передаём свойства объектов в функцию добавления пинов на карту
    window.backend.fetchData(window.renderAnnouncements);
    priceField.placeholder = priceFieldDefaultPlaceholder;
    priceField.min = priceFieldDefaultPlaceholder;
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePage();
    }
  });


  window.activatePage = activatePage;

})();
