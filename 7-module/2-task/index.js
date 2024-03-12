import createElement from '../../assets/lib/create-element.js';
export default class Modal {
  constructor() {
    this.elem = createElement(`<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>`);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.prepend(this.elem);

    const buttonClick = this.elem.querySelector('.modal__close');
    buttonClick.addEventListener('click', () => {
      this.close();
    }, { once: true })

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    }, { once: true })
  }

  setTitle(title) {
    const titleAdd = this.elem.querySelector('.modal__title');
    titleAdd.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

}