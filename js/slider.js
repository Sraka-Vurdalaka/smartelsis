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
