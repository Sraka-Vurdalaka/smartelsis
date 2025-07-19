const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slides = document.querySelectorAll('.slide');

let currentIndex = 0;
const slideWidth = slides[0].offsetWidth + 20; // Учитываем gap (20px)

function goToSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [54.627284, 83.291360],
          zoom: 16
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Смартэлсис',
        balloonContent: '<div>Новосибирская область, Искитим, </div><div>Юбилейный проспект, 1Б / 2</div><div><img src="../images/enter.jpg" alt="smarelsist" style="width: 100%; height: 150px; object-fit: cover;"></div>'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../images/mark.svg',
          // Размеры метки.
          iconImageSize: [30, 42],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-10, -35],
          iconContentLayout: MyIconContentLayout
      })
  myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);
});


