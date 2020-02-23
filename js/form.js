'use strict';

(function () {

  var ROOMS_MAP = {
    1: ['0', '2', '3'],
    2: ['0', '3'],
    3: ['0'],
    100: ['1', '2', '3']
  };

  var PROPERTY_TYPES_MAP = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var guestsSelect = document.querySelector('#capacity');
  var roomsSelect = document.querySelector('#room_number');
  var setRestrictions = function () {
    var currentRestrictions = ROOMS_MAP[roomsSelect.value];
    var guestOptions = guestsSelect.options;
    [].forEach.call(guestOptions, function (option) {
      option.disabled = !(currentRestrictions.indexOf(option.value) === -1);
    });
  };

  var checkInTime = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');

  guestsSelect.value = roomsSelect.value;

  setRestrictions();

  // обработчик валидации комнат
  roomsSelect.addEventListener('change', setRestrictions);

  checkInTime.addEventListener('change', function () {
    if (checkInTime.value !== checkOutTime.value) {
      checkOutTime.value = checkInTime.value;
    }
  });

  checkOutTime.addEventListener('change', function () {
    if (checkInTime.value !== checkOutTime.value) {
      checkInTime.value = checkOutTime.value;
    }
  });

  // Проверка типа жилья и цены

  var selectType = document.querySelector('#type');

  var priceField = document.querySelector('#price');

  selectType.addEventListener('change', function () {
    priceField.min = priceField.placeholder = PROPERTY_TYPES_MAP[selectType.value];
  });

})();
