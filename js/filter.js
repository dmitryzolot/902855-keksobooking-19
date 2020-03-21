'use strict';

(function () {

  var PINS_LIMIT = 5;


  var Price = {
    LOW: 10000,
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: 50000
  };

  // Форма фильтров
  var mapFiltersForm = document.querySelector('.map__filters');
  var typeFilter = mapFiltersForm.querySelector('#housing-type');
  var priceFilter = mapFiltersForm.querySelector('#housing-price');
  var roomsFilter = mapFiltersForm.querySelector('#housing-rooms');
  var guestsFilter = mapFiltersForm.querySelector('#housing-guests');
  var featuresFilter = mapFiltersForm.querySelector('#housing-features');


  // Функция сравнения типа жилья элемента с выбранным в форме
  var checkOfferType = function (element) {
    return element.offer.type === typeFilter.value ? true : typeFilter.value === 'any';
  };


  // Функция сравнения цены жилья
  var checkOfferPrice = function (element) {
    if (priceFilter.value === 'any') {
      return true;
    }
    if (element.offer.price < Price.LOW) {
      return priceFilter.value === 'low';
    }
    if (element.offer.price >= Price.MIDDLE.MIN && element.offer.price <= Price.MIDDLE.MAX) {
      return priceFilter.value === 'middle';
    }
    if (element.offer.price > Price.HIGH) {
      return priceFilter.value === 'high';
    }

    return false;
  };


  // Функция сравнения количества комнат
  var checkOfferRooms = function (element) {
    return element.offer.rooms === parseInt(roomsFilter.value, 10) ? true : roomsFilter.value === 'any';
  };


  // Функция сравнения количества гостей
  var checkOfferGuests = function (element) {
    if (guestsFilter.value === 'any') {
      return true;
    }
    if (parseInt(guestsFilter.value, 10) !== 0 || parseInt(guestsFilter.value, 10) === 0) {
      return element.offer.guests === parseInt(guestsFilter.value, 10);
    }

    return false;
  };


  // Функция сравнения наличия features
  var checkOfferFeatures = function (offerElement) {
    var checkedFeatures = featuresFilter.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return offerElement.offer.features.includes(element.value);
    });
  };

  // Массив для отфильтрованных данных
  var filterData = function (filterArray, filteredOffers, callBack) {
    for (var i = 0; i < filterArray.length; i++) {
      if (callBack(filterArray[i])) {
        filteredOffers.push(filterArray[i]);
      }
      if (filteredOffers.length === PINS_LIMIT) {
        break;
      }
    }
    return filteredOffers;
  };

  // Обработчик события изменения формы
  var formChangeHandler = window.debounce.setupInterval(function () {

    // Удаление несоответсвующих фильтру пинов (кроме главного пина)
    window.similarOffer.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (element) {
      element.remove();
    });

    // Удаление карточки объявления
    window.similarOffer.tryRemoveCard();

    // Фильтрация массива
    window.similarOffer.renderPins(
        filterData(
            filterData(
                filterData(
                    filterData(
                        filterData(window.announcements, [], checkOfferType),
                        [], checkOfferPrice),
                    [], checkOfferRooms),
                [], checkOfferGuests),
            [], checkOfferFeatures)
    );
  });


  // Обработчик изменения формы
  mapFiltersForm.addEventListener('change', formChangeHandler);


  window.filter = {
    formChangeHandler: formChangeHandler
  };

})();
