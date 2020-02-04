'use strict';

var mapBlock = document.querySelector('.map');
var mapBlockWidth = mapBlock.offsetWidth;

function getArrayRandomElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function randomInteger(min, max) {
  // случайное число от min до max
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}


function generateUserIDNumber(length) {
  var userIDs = [];

  for (var i = 0; i <= length; i++) {
    userIDs.push('img/avatars/user0' + i + '.png');
  }
  return userIDs;
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
  var rand = min + Math.random() * (max + 1 - min);
  return Math.round(Math.floor(rand) / 100) * 100;
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
  location.x = randomInteger(minX, maxX);
  location.y = randomInteger(minY, maxY);

  return location;
}


function generateLocationsArray(length) {
  var locations = [];
  for (var i = 1; i <= length; i++) {
    locations.push(generateLocation(0, mapBlockWidth, 130, 630));
  }
  return locations;
}


var locationsArray = generateLocationsArray(8);


function generateAddressesArray(length) {
  var addresses = [];
  for (var i = 1; i <= length; i++) {
    addresses.push('строка' + generateLocation(0, mapBlockWidth, 130, 630));
  }
  return addresses;
}

console.log(generateAddressesArray(8));

// function generateLocationsArray(length, minX, maxX, minY, maxY) {
//   var locationsArray = [];

//   for (var i = 1; i <= length; i++) {
//     var location = {};
//     locationsArray.push(randomInteger(minX, maxX), randomInteger(minY, maxY));

//     for (var i = 1; i <= length; i++) {
//       location.push(randomInteger(minX, maxX), randomInteger(minY, maxY));
//     }

//     return location;

//   }

//   return locationsArray;

// }

// console.log(generateLocationsArray(3, 0, mapBlockWidth, 130, 630));


var AVATARS = generateUserIDNumber(8);
var AUTHORS_NAMES = generateAuthorNamesArray(8);

var TITLES = ['Комната', 'Студия', 'Квартира', 'Apartments'];
var ADDRESSES = generateAddressesArray(8);
var PRICES = generatePricesArray(8, 5000, 100000);
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_NUMBER = [1, 2, 3];
var GUESTS_NUMBER = [1, 2, 0];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['некий текст, некий текст'];
var PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var LOCATIONS = locationsArray;


mapBlock.classList.remove('map--faded');

// AVATARS.forEach(function (item, i, AVATARS) {
//   console.log(AVATARS[i]);
//   // перебирает все элементы массива AVATARS
// });

function generateAuthor(authorName, authorAvatar, i) {
  var author = {};

  author.name = getArrayRandomElement(authorName);
  author.avatar = authorAvatar[i];

  return author;

}


function generateAuthorsArray(length) {
  var authors = [];
  for (var i = 1; i <= length; i++) {
    authors.push(generateAuthor(AUTHORS_NAMES, AVATARS, i));
  }
  return authors;
}

var authorsArray = generateAuthorsArray(8);

var generateAnnouncement = function (announcementAuthor, announcementTitle, announcementAddress, announcementPrice, announcementType, announcementRoomsNumber, announcementGuestsNumber, announcementCheckin, announcementCheckout, announcementFeatures, announcementDescription, announcementPhoto, announcementLocation) {
  var announcement = {};
  announcement.author = getArrayRandomElement(announcementAuthor);
  announcement.title = getArrayRandomElement(announcementTitle);
  announcement.address = getArrayRandomElement(announcementAddress);
  announcement.price = getArrayRandomElement(announcementPrice);
  announcement.type = getArrayRandomElement(announcementType);
  announcement.roomsNumber = getArrayRandomElement(announcementRoomsNumber);
  announcement.guestsNumber = getArrayRandomElement(announcementGuestsNumber);
  announcement.checkin = getArrayRandomElement(announcementCheckin);
  announcement.checkout = getArrayRandomElement(announcementCheckout);
  announcement.features = getArrayRandomElement(announcementFeatures);
  announcement.description = getArrayRandomElement(announcementDescription);
  announcement.photo = getArrayRandomElement(announcementPhoto);
  announcement.location = getArrayRandomElement(announcementLocation);

  return announcement;
};

function generateAnnouncementsArray(length) {

  var announcements = [];

  for (var i = 1; i <= length; i++) {
    announcements.push(generateAnnouncement(authorsArray, TITLES, ADDRESSES, PRICES, TYPES, ROOMS_NUMBER, GUESTS_NUMBER, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOES, LOCATIONS));
  }
  return announcements;
}
var announcements = generateAnnouncementsArray(8);

console.log(announcements);
