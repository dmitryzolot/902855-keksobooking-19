'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];

  // Аватар
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropArea = document.querySelector('.ad-form-header__drop-zone');

  // Фото жилья
  var offerFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var offerPreview = document.querySelector('.ad-form__photo');
  var offerDropArea = document.querySelector('.ad-form__drop-zone');


  // Функция удаления действия по умолчанию при перетаскивании файла
  var preventEvents = function (element, eventType) {
    element.addEventListener(eventType, function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });
  };

  EVENTS.forEach(function (eventType) {
    preventEvents(avatarDropArea, eventType);
    preventEvents(offerDropArea, eventType);
  });


  // Функция для отображения превью картинки при перетаскивании и загрузки в форму
  var uploadImage = function (eventType, fileChooser, preview, img) {
    fileChooser.addEventListener(eventType, function (evt) {

      var file = eventType === 'drop' ? evt.dataTransfer.files[0] : evt.target.files[0];

      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        var inputLoadHandler = function () {
          if (img) {
            preview.src = reader.result;
          } else {
            preview.style.background = 'url(' + reader.result + ')';
            preview.style.backgroundPosition = 'center';
            preview.style.backgroundSize = 'contain';
          }
        };

        reader.addEventListener('load', inputLoadHandler);

        reader.readAsDataURL(file);
      }
    });
  };

  uploadImage('drop', avatarDropArea, avatarPreview, true);
  uploadImage('drop', offerDropArea, offerPreview, false);

  uploadImage('change', avatarFileChooser, avatarPreview, true);
  uploadImage('change', offerFileChooser, offerPreview, false);


  window.image = {
    avatarPreview: avatarPreview,
    offerPreview: offerPreview
  };

})();
