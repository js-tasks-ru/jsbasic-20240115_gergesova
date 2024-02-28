import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(this.menu());
    this.scroll();
    this.selectCategories();
  }

  menu() {
    return `<div class="ribbon">
            <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
             </button>
       <nav class="ribbon__inner">`+
      this.categories.map(category =>
        `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`).join('') +
      `</nav>   
          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
          </div>`
  }

  scroll() {
    const buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    const buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;// не работает scrollLeft!?
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    buttonRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    buttonLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      if (scrollLeft == 0 && scrollRight >= 1) {
        buttonLeft.classList.remove('.ribbon__arrow_visible');
        buttonRight.classList.add('ribbon__arrow_visible');
      } else if (scrollLeft !== 0 && scrollRight < 1) {
        buttonLeft.classList.add('.ribbon__arrow_visible');
        buttonRight.classList.remove('ribbon__arrow_visible');
      }
    });
  }


  selectCategories() {
    let categoriesHref = Array.from(this.elem.querySelectorAll('.ribbon__item'));

    categoriesHref.forEach((category, index) => {

      category.addEventListener('click', event => {
        event.preventDefault();

        categoriesHref.forEach(item => {
          item.classList.remove('ribbon__item_active');
        });
        category.classList.add('ribbon__item_active');

        const custom = new CustomEvent('ribbon-select', {
          detail: this.categories[index].id,
          bubbles: true
        });
        category.dispatchEvent(custom);
      });
    });
  }

}