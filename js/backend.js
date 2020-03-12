'use strict';

(function () {

  // Функция показа и закрытия сообщения об ошибке
  var onError = function (message) {

    var mainWindow = document.querySelector('main');

    var errorTemplate = document.querySelector('#error').content.querySelector('.error');

    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.textContent = message;

    mainWindow.append(errorTemplate);


    var documentClickHandler = function (evt) {
      if (evt.target !== errorMessage) {
        mainWindow.removeChild(errorTemplate);
        window.upload.setPageInitialState();

        document.removeEventListener('click', documentClickHandler);
        document.removeEventListener('keydown', errorButtonKeydownHandler);
      }
    };

    var errorButtonKeydownHandler = function (evt) {
      if (evt.keycode === window.Uint8ClampedArray.ESC_KEYCODE) {
        mainWindow.removeChild(errorTemplate);
        window.upload.setPageInitialState();

        document.removeEventListener('click', documentClickHandler);
        document.removeEventListener('keydown', errorButtonKeydownHandler);
      }
    };

    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', errorButtonKeydownHandler);
  };


  var fetchData = function (onSuccess) {

    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус' + ' ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения' + ' ' + xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться' + ' ' + xhr.timeout);
    });


    xhr.open('GET', URL);

    xhr.send();
  };


  //  Функция загрузки данных на сервер
  var saveData = function (data, onSuccess) {

    // URL-адрес сервера для отправки данных
    var URL = 'https://js.dump.academy/keksobooking';

    // Создаём запрос на сервер
    var xhr = new XMLHttpRequest();

    // Автоматический перевод текста в JSON
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);

      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // Как и куда мы хотим обратиться
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    fetchData: fetchData,
    saveData: saveData
  };
})();
