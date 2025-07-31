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

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.querySelector('.banner');
  const bannerBefore = banner.querySelector('::before');

  // Функция для параллакс-эффекта
  function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5; // Скорость параллакса

    // Применяем трансформацию к псевдоэлементу через CSS переменную
    banner.style.setProperty('--parallax-offset', rate + 'px');
  }

  // Функция для анимации появления элементов
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .bounce-in, .rotate-in',
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Расстояние от верха экрана для активации

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  // Оптимизированный обработчик скролла с throttle
  let ticking = false;
  function updateScroll() {
    parallaxEffect();
    animateOnScroll();
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  // Добавляем обработчик скролла
  window.addEventListener('scroll', requestTick, { passive: true });

  // Инициализация при загрузке
  parallaxEffect();
  animateOnScroll();
});
