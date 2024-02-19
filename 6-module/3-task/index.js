import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(this.slideCarousel());
    this.initCarousel();
    this.buttonCarousel();
  }

  slideCarousel() {
    return `<div class="carousel">
              <div class="carousel__arrow carousel__arrow_right">
                  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
              </div>
              <div class="carousel__arrow carousel__arrow_left">
                  <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
              </div>
              <div class="carousel__inner">`+
      this.slides.map(slide =>
        `<div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
        </div>`).join('') +
      `</div>
      </div>`;
  }

  initCarousel() {
    const buttonRight = this.elem.querySelector('.carousel__arrow_right');
    const buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    const tape = this.elem.querySelector('.carousel__inner');

    let i = 0;
    if (i == 0) buttonLeft.style.display = 'none';

    buttonRight.addEventListener('click', () => {
      i++;
      tape.style.transform = 'translateX(' + -tape.offsetWidth * i + 'px)';
      if (i == this.slides.length - 1) buttonRight.style.display = 'none';
      if (i > 0 && i < this.slides.length) buttonLeft.style.display = '';
    });

    buttonLeft.addEventListener('click', () => {
      i--;
      tape.style.transform = 'translateX(' + -tape.offsetWidth * i + 'px)';
      if (i == 0) buttonLeft.style.display = 'none';
      if (i >= 0 && i < this.slides.length - 1) buttonRight.style.display = '';
    });
  }

  buttonCarousel() {
    let buttons = Array.from(this.elem.querySelectorAll('.carousel__button'));

    for (let i = 0; i < this.slides.length; i++) {
      buttons[i].addEventListener('click', event => {
        const custom = new CustomEvent("product-add", {
          detail: this.slides[i].id,
          bubbles: true
        });
        event.target.dispatchEvent(custom);
      });

    }
  }


}






