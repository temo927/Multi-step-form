const slides = document.querySelectorAll(`.slide`);
const next = document.querySelector(`.form__button--next`);
const back = document.querySelector(`.form__button--back`);
const confirm = document.querySelector(`.form__button--confirm`);

class App {
  #currentSlide = 0;
  #maxSlide = slides.length;
  constructor() {
    this.#goToSlide(0);
    //next slide
    next.addEventListener(`click`, this.#nextSlide.bind(this));
    // previous slide
    back.addEventListener(`click`, this.#prevSlide.bind(this));
  }

  #goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  #nextSlide() {
    this.#currentSlide++;

    if (this.#currentSlide === 3) {
      next.classList.toggle(`hidden`);
      confirm.classList.toggle(`hidden`);
    }

    this.#goToSlide(this.#currentSlide);

    back.classList.remove(`hidden`);
  }

  #prevSlide() {
    this.#currentSlide--;
    if (this.#currentSlide === 0) {
      back.classList.add(`hidden`);
    }
    if (this.#currentSlide === 2) {
      next.classList.toggle(`hidden`);
      confirm.classList.toggle(`hidden`);
    }
    this.#goToSlide(this.#currentSlide);
  }
}

const app = new App();

// // moving slides
// const goToSlide = function (slide) {
//   slides.forEach((s, i) => {
//     s.style.transform = `translateX(${100 * (i - slide)}%)`;
//   });
// };

// const nextSlide = function () {
//   currentSlide++;

//   if (currentSlide === 3) {
//     next.classList.toggle(`hidden`);
//     confirm.classList.toggle(`hidden`);
//   }

//   goToSlide(currentSlide);

//   back.classList.remove(`hidden`);
// };

// const prevSlide = function () {
//   currentSlide--;
//   if (currentSlide === 0) {
//     back.classList.add(`hidden`);
//   }
//   if (currentSlide === 2) {
//     next.classList.toggle(`hidden`);
//     confirm.classList.toggle(`hidden`);
//   }
//   goToSlide(currentSlide);
// };

// // slides to default position
// goToSlide(0);
// //next slide
// next.addEventListener(`click`, nextSlide);
// // previous slide
// back.addEventListener(`click`, prevSlide);
