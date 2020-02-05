'use strict';

var TITLES = ['Комната', 'Студия', 'Квартира', 'Apartments'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_NUMBER = [1, 2, 3];
var GUESTS_NUMBER = [1, 2, 0];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['некий текст, некий текст'];
var PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;

var mapBlock = document.querySelector('.map');
var mapBlockWidth = mapBlock.offsetWidth;

//  Добавляем в переменную контейнер для пинов
var mapPins = document.querySelector('.map__pins');

//  Добавляем в переменную template пинов
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getRandomElement(array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
}

function getRandomInteger(min, max) {
  // случайное число от min до max
  return Math.floor(min + Math.random() * (max - min));
}


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
  location.x = getRandomInteger(minX, maxX);
  location.y = getRandomInteger(minY, maxY);

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

// console.log(generateAddressesArray(8));


mapBlock.classList.remove('map--faded');


function generateAuthor(authorName, authorAvatar, i) {
  var author = {};

  author.name = getRandomElement(authorName);
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

var avatars = generateImagePath(8);
var authorsNames = generateAuthorNamesArray(8);
var addressesArray = generateAddressesArray(8);
var prices = generatePricesArray(8, 5000, 100000);
var locationsArray = generateLocationsArray(8);

var authorsArray = generateAuthorsArray(8);

var generateAnnouncement = function (announcementAuthor, announcementTitle, announcementAddress, announcementPrice, announcementType, announcementRoomsNumber, announcementGuestsNumber, announcementCheckin, announcementCheckout, announcementFeatures, announcementDescription, announcementPhoto, announcementLocation) {
  var announcement = {};
  announcement.author = getRandomElement(announcementAuthor);
  announcement.title = getRandomElement(announcementTitle);
  announcement.address = getRandomElement(announcementAddress);
  announcement.price = getRandomElement(announcementPrice);
  announcement.type = getRandomElement(announcementType);
  announcement.roomsNumber = getRandomElement(announcementRoomsNumber);
  announcement.guestsNumber = getRandomElement(announcementGuestsNumber);
  announcement.checkin = getRandomElement(announcementCheckin);
  announcement.checkout = getRandomElement(announcementCheckout);
  announcement.features = getRandomElement(announcementFeatures);
  announcement.description = getRandomElement(announcementDescription);
  announcement.photo = getRandomElement(announcementPhoto);
  announcement.location = getRandomElement(announcementLocation);

  return announcement;
};

function generateAnnouncementsArray(length) {

  var announcements = [];

  for (var i = 1; i <= length; i++) {
    announcements.push(generateAnnouncement(authorsArray, TITLES, addressesArray, prices, TYPES, ROOMS_NUMBER, GUESTS_NUMBER, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOES, locationsArray));
  }
  return announcements;
}
var announcements = generateAnnouncementsArray(8);

// console.log(announcements);


var createTemplatePin = function (announcementObject) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = announcementObject.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = announcementObject.location.y - PIN_HEIGHT + 'px';


  pinElement.querySelector('img').src = announcementObject.author.avatar; pinElement.querySelector('img').alt = announcementObject.announcementTitle;

  return pinElement;
};

// Функция добавления пинов в контейнер
var renderAnnouncements = function () {
  // Создаем фрагмент
  var fragment = document.createDocumentFragment();

  // Вызываем функцию добавления свойств объектов в элементы шаблона и записываем её в фрагмент
  for (var i = 0; i < announcements.length; i++) {
    // Добавляем фрагмент на карту
    mapPins.appendChild(fragment);

    fragment.appendChild(createTemplatePin(announcements[i]));
  }
};

// Передаём свойства объектов в функцию добавления пинов на карту
renderAnnouncements();
