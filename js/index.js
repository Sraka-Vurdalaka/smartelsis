//! Слайдер Start

$(document).ready(function () {
  $('.slider-container').slick({
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: true,
    touchThreshold: 10,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },

      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });
});

//! Слайдер End

ymaps.ready(function () {
  var myMap = new ymaps.Map(
    'map',
    {
      center: [54.627284, 83.29136],
      zoom: 16,
    },
    {
      searchControlProvider: 'yandex#search',
    },
  );

  // Создаём макет содержимого.
  (MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
  )),
    (myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        hintContent: 'Смартэлсис',
        balloonContent:
          '<div>Новосибирская область, Искитим, </div><div>Юбилейный проспект, 1Б / 2</div><div><img src="./images/enter.jpg" alt="smarelsist" style="width: 100%; height: 150px; object-fit: cover;"></div>',
      },
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: './images/mark.svg',
        // Размеры метки.
        iconImageSize: [30, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-10, -35],
        iconContentLayout: MyIconContentLayout,
      },
    ));
  myMap.geoObjects.add(myPlacemark);
});
