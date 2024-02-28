import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(this.elemNew());
    this.elemNew();
    this.thumbClick();
    this.thumbDnD();
  }

  elemNew() {
    let step = '';
    for (let i = 0; i < this.steps; i++) {
      if (i === 0) {
        step += `<span class="slider__step-active"></span>`;
      } else {
        step += `<span></span>`;
      }
    };

    return ` 
    <div class="slider">
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
           <div class="slider__steps">
        ${step}
      </div >
    </div > `;
  }

  thumbClick() {
    this.elem.addEventListener('click', (event) => {
      let scrollPx = event.clientX - this.elem.getBoundingClientRect().left;
      let scrollRelative = scrollPx / this.elem.offsetWidth;
      let scrollStep = Math.round(scrollRelative * (this.steps - 1));
      this.value = scrollStep;

      let sliderValue = this.elem.querySelector('.slider__value');
      sliderValue.innerHTML = this.value;

      let sliderSteps = Array.from(this.elem.querySelector('.slider__steps').children);
      sliderSteps.forEach(slider => slider.classList.remove('slider__step-active'));
      sliderSteps[scrollStep].classList.add('slider__step-active');

      let sliderThumb = this.elem.querySelector('.slider__thumb');
      let sliderProgress = this.elem.querySelector('.slider__progress');
      let percent = scrollStep * 100 / (this.steps - 1);
      sliderThumb.style.left = `${percent}%`;
      sliderProgress.style.width = `${percent}%`;

      const custom = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(custom);
    });

  }

  thumbDnD() {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onDown);
  }

  onDown = () => {
    document.addEventListener('pointermove', this.onMove);
    document.addEventListener('pointerup', this.onUp, { once: true });
  }

  onMove = (event) => {
    this.elem.classList.add('slider_dragging');
    let scrollPx = event.clientX - this.elem.getBoundingClientRect().left;
    let scrollRelative = scrollPx / this.elem.offsetWidth;
    let scrollStep = Math.round(scrollRelative * (this.steps - 1));
    this.value = scrollStep;

    if (scrollRelative < 0) {
      return scrollRelative = 0;
    }

    if (scrollRelative > 1) {
      return scrollRelative = 1;
    }

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;

    let sliderSteps = Array.from(this.elem.querySelector('.slider__steps').children);
    sliderSteps.forEach(slider => slider.classList.remove('slider__step-active'));
    sliderSteps[scrollStep].classList.add('slider__step-active');

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let percent = scrollRelative * 100;
    sliderThumb.style.left = `${percent}%`;
    sliderProgress.style.width = `${percent}%`;
  }

  onUp = () => {
    document.removeEventListener('pointermove', this.onMove);
    this.elem.classList.remove('slider_dragging');
    const custom = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })
    this.elem.dispatchEvent(custom);
  }

}
