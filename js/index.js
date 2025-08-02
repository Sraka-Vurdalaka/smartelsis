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

  // Создаем элементы для модального окна
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalImage = document.createElement('img');
  modalImage.className = 'modal-image';
  
  modalContent.appendChild(modalImage);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  const style = document.createElement('style');
  document.head.appendChild(style);
  
  // Получаем все изображения
  const images = document.querySelectorAll('.gidravlicaImg img');
  
  // Добавляем обработчики клика
  images.forEach(img => {
    img.addEventListener('click', function() {
      modalImage.src = this.src;
      modalImage.alt = this.alt;
      modalOverlay.style.display = 'flex';
    });
  });
  
  // Закрытие по клику на оверлей
  modalOverlay.addEventListener('click', function() {
    this.style.display = 'none';
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

  // Функция для параллакс-эффекта
  function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5; // Скорость параллакса

    // Применяем трансформацию к псевдоэлементу через CSS переменную
    // banner.style.setProperty('--parallax-offset', rate + 'px');
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


  const burgerIcon = document.getElementById('burgerIcon');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  // Функция открытия меню
  function openMobileMenu() {
    burgerIcon.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Функция закрытия меню
  function closeMobileMenu() {
    burgerIcon.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Обработчик клика по бургеру
  burgerIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Обработчик клика по кнопке закрытия
  mobileMenuClose.addEventListener('click', closeMobileMenu);

  // Обработчик клика по оверлею
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Обработчик выпадающего меню в мобильной версии
  const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown');
  mobileDropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector('.btnDropdown');
    btnDropdown.addEventListener('click', function (e) {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  });

  // Закрытие меню при клике на пункт
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Закрытие меню при нажатии Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Предотвращение закрытия при клике внутри меню
  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});


