'use strict';

(function () {

  var TITLES = ['Комната', 'Студия', 'Квартира', 'Apartments'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_NUMBER = [1, 2, 3];
  var GUESTS_NUMBER = [1, 2, 0];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['некий текст, некий текст'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;

  var mapBlock = document.querySelector('.map');
  var mapBlockWidth = mapBlock.offsetWidth;


  // function getRandomElement(array) {
  //   var random = Math.floor(Math.random() * array.length);
  //   return array[random];
  // }

  // function getRandomInteger(min, max) {
  //   // случайное число от min до max
  //   return Math.floor(min + Math.random() * (max - min));
  // }

  function generateImagePath(length) {
    var imagePathes = [];

    for (var i = 0; i <= length; i++) {
      imagePathes.push('img/avatars/user0' + i + '.png');
    }
    return imagePathes;
  }

  function generateAuthorNamesArray(length) {

    var authorNames = [];

    for (var i = 1; i <= length; i++) {
      authorNames.push('имя' + i);
    }
    return authorNames;
  }

  function getRandomRound100Integer(min, max) {
    // случайное число от min до (max+1), округленное до сотен
    var random = min + Math.random() * (max + 1 - min);
    return Math.round(Math.floor(random) / 100) * 100;
  }

  function generatePricesArray(length, min, max) {
    var pricesArray = [];

    for (var i = 1; i <= length; i++) {
      pricesArray.push(getRandomRound100Integer(min, max));
    }
    return pricesArray;
  }


  function generateLocation(minX, maxX, minY, maxY) {
    var location = {};
    location.x = window.util.getRandomInteger(minX, maxX);
    location.y = window.util.getRandomInteger(minY, maxY);

    return location;
  }


  function generateLocationsArray(length) {
    var locations = [];
    for (var i = 1; i <= length; i++) {
      locations.push(generateLocation(0, mapBlockWidth, MIN_Y, MAX_Y));
    }
    return locations;
  }


  function generateAddressesArray(length) {
    var addresses = [];
    for (var i = 1; i <= length; i++) {
      addresses.push(generateLocation(0, mapBlockWidth, MIN_Y, MAX_Y));
    }
    return addresses;
  }

  function generateAuthor(authorName, authorAvatar, i) {
    var author = {};

    author.name = window.util.getRandomElement(authorName);
    author.avatar = authorAvatar[i];

    return author;

  }


  function generateAuthorsArray(length) {
    var authors = [];
    for (var i = 1; i <= length; i++) {
      authors.push(generateAuthor(authorsNames, avatars, i));
    }
    return authors;
  }

  function generateFeaturesArray(array) {
    var featuresArray = [];
    var length = Math.floor(Math.random() * array.length);
    for (var i = 1; i <= length; i++) {
      featuresArray.push(array[i]);
    }
    return featuresArray;
  }

  var avatars = generateImagePath(8);
  var authorsNames = generateAuthorNamesArray(8);
  var addressesArray = generateAddressesArray(8);
  var prices = generatePricesArray(8, 5000, 100000);
  var locationsArray = generateLocationsArray(8);

  var authorsArray = generateAuthorsArray(8);

  var generateAnnouncement = function (announcementAuthor, announcementTitle, announcementAddress, announcementPrice, announcementType, announcementRoomsNumber, announcementGuestsNumber, announcementCheckin, announcementCheckout, announcementFeatures, announcementDescription, announcementPhoto, announcementLocation) {
    var announcement = {};
    announcement.author = window.util.getRandomElement(announcementAuthor);
    announcement.title = window.util.getRandomElement(announcementTitle);
    announcement.address = window.util.getRandomElement(announcementAddress);
    announcement.price = window.util.getRandomElement(announcementPrice);
    announcement.type = window.util.getRandomElement(announcementType);
    announcement.roomsNumber = window.util.getRandomElement(announcementRoomsNumber);
    announcement.guestsNumber = window.util.getRandomElement(announcementGuestsNumber);
    announcement.checkin = window.util.getRandomElement(announcementCheckin);
    announcement.checkout = window.util.getRandomElement(announcementCheckout);
    announcement.features = generateFeaturesArray(announcementFeatures);
    announcement.description = window.util.getRandomElement(announcementDescription);
    announcement.photos = window.util.getRandomElement(announcementPhoto);
    announcement.location = window.util.getRandomElement(announcementLocation);

    return announcement;
  };

  function generateAnnouncementsArray(length) {

    var announcements = [];

    for (var i = 1; i <= length; i++) {
      announcements.push(generateAnnouncement(authorsArray, TITLES, addressesArray, prices, TYPES, ROOMS_NUMBER, GUESTS_NUMBER, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, locationsArray));
    }
    return announcements;
  }
  var announcements = generateAnnouncementsArray(8);

  // console.log(announcements);


  // return announcements;


  window.data = {
    announcement: generateAnnouncement(authorsArray, TITLES, addressesArray, prices, TYPES, ROOMS_NUMBER, GUESTS_NUMBER, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, locationsArray),
    announcements: announcements,
    TITLES: TITLES,
    TYPES: TYPES,
    ROOMS_NUMBER: ROOMS_NUMBER,
    GUESTS_NUMBER: GUESTS_NUMBER,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
  };

})();
