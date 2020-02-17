'use strict';

var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';

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

var checkInTime = document.querySelector('#timein');
var checkOutTime = document.querySelector('#timeout');

var mapBlock = document.querySelector('.map');
var mapBlockWidth = mapBlock.offsetWidth;

var mapOptionFilters = document.querySelectorAll('.map__filter');
var mapCheckboxes = document.querySelectorAll('.map__checkbox');

var mainPin = document.querySelector('.map__pin--main');

var mainForm = document.querySelector('.ad-form');

var formFieldsets = document.querySelectorAll('.ad-form__element');


formFieldsets.forEach(function (filter) {
  filter.setAttribute('disabled', 'disabled');
});

guestsSelect.value = roomsSelect.value;

setRestrictions();

// Функция удаления карточки
var removeCard = function () {
  var popupElement = document.querySelector('.popup');

  if (popupElement) {
    popupElement.parentNode.removeChild(popupElement);
  }
};


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

// var mapPin = document.querySelector('.map__pin');

//  Добавляем в переменную контейнер для пинов
var mapPins = document.querySelector('.map__pins');

//  Добавляем в переменную template пинов
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Добавляем в переменную template карточки
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

mapOptionFilters.forEach(function (filter) {
  filter.setAttribute('disabled', 'disabled');
});

mapCheckboxes.forEach(function (checkbox) {
  checkbox.setAttribute('disabled', 'disabled');
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
  renderAnnouncements();
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

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

function generateFeaturesArray(array) {
  var featuresArray = [];
  var length = Math.floor(Math.random() * array.length);
  for (var i = 1; i <= length; i++) {
    featuresArray.push(array[i]);
  }
  return featuresArray;
}

// console.log(generateFeaturesArray(FEATURES));

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
  announcement.features = generateFeaturesArray(announcementFeatures);
  announcement.description = getRandomElement(announcementDescription);
  announcement.photos = getRandomElement(announcementPhoto);
  announcement.location = getRandomElement(announcementLocation);

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


var createTemplatePin = function (announcementObject) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = announcementObject.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = announcementObject.location.y - PIN_HEIGHT + 'px';


  pinElement.querySelector('img').src = announcementObject.author.avatar; pinElement.querySelector('img').alt = announcementObject.announcementTitle;

  pinElement.addEventListener('click', function (evt) {
    var popupElement = document.querySelector('.popup');
    if (evt.target.classList.contains('map__pin--main')) {
      return;
    }
    if (mapBlock.contains(popupElement)) {
      removeCard();
    }
    renderCard(announcementObject);

  });

  pinElement.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin--main')) {
      return;
    }

    if (evt.key === ENTER_KEY) {
      removeCard();
      renderCard(announcementObject);
    }
  });

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


// Создаём функцию добавления свойств карточки в разметку
var createTemplateCard = function (announcement) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = announcement.title;
  cardElement.querySelector('.popup__text--address').textContent = announcement.address;
  cardElement.querySelector('.popup__text--price').textContent = announcement.price + 'руб/ночь';
  cardElement.querySelector('.popup__type').textContent = announcement.type;
  cardElement.querySelector('.popup__text--capacity').textContent = getTextRoom(announcement.roomsNumber, announcement.guestsNumber);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.checkin + ', ' + 'выезд до ' + announcement.checkout;


  var featuresList = cardElement.querySelector('.popup__features');

  featuresList.innerHTML = '<ul class="popup__features"></ul>';

  // Добавляем в очищенный список случайное количество features
  var addFeatures = function (tagName, firstClassName, secondClassName) {
    var featureElement = document.createElement(tagName);
    featureElement.classList.add(firstClassName);
    featureElement.classList.add(secondClassName);
    return featureElement;
  };


  for (var i = 0; i <= announcement.features.length - 1; i++) {
    featuresList.appendChild(addFeatures('li', 'popup__feature', 'popup__feature--' + announcement.features[i]));
  }


  cardElement.querySelector('.popup__description ').textContent = announcement.description;
  cardElement.querySelector('.popup__photos img').src = announcement.photos;
  cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  // Закрытие попапа
  var popupClose = cardElement.querySelector('.popup__close');
  popupClose.addEventListener('click', removeCard);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESCAPE_KEY) {
      removeCard();
    }
  });

  return cardElement;
};


// Функция добавления карточек на карту перед "map__filters-container"
var renderCard = function (announcementData) {
  var fragment = document.createDocumentFragment();
  var mapFilters = document.querySelector('.map__filters-container');
  fragment.appendChild(createTemplateCard(announcementData));
  mapBlock.insertBefore(fragment, mapFilters);
};

// renderCard(generateAnnouncement(authorsArray, TITLES, addressesArray, prices, TYPES, ROOMS_NUMBER, GUESTS_NUMBER, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, locationsArray));

