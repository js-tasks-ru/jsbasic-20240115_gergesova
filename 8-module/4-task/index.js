import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let productAdded = this.cartItems.find(item => item.product.id === product.id)
    if (!productAdded) {
      productAdded = {};
      productAdded.product = product;
      productAdded.count = 1;

      this.cartItems.push(productAdded);
    } else {
      productAdded.count++;
    }
    this.onProductUpdate(productAdded)
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem.product.id == productId) {
        cartItem.count += amount;
        if (cartItem.count == 0) {
          this.cartItems.splice(index, 1);
        }
      }
      this.onProductUpdate(cartItem);
    })
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let sum = 0;
    this.cartItems.forEach((item) => sum += item.count);
    return sum;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach((item) => price += item.product.price * item.count);
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.cartBody = document.createElement('div');
    for (let item of this.cartItems) {
      this.cartBody.append(this.renderProduct(item.product, item.count));
    }
    this.cartBody.append(this.renderOrderForm());
    this.modal.setBody(this.cartBody);

    this.modal.open();

    this.cartBody.addEventListener('click', event => {
      let productElem = event.target.closest('.cart-product');

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(productElem.dataset.productId, -1);
      } else if (event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount(productElem.dataset.productId, 1);
      }
    })

    const cartForm = this.cartBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', event => this.onSubmit(event));
  }


  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    let cartProduct = document.body.querySelectorAll('.cart-product');
    let infoPrice = document.body.querySelector('.cart-buttons__info-price');

    if (document.body.classList.contains('is-modal-open')) {

      cartProduct.forEach(item => {
        let productCount = item.querySelector('.cart-counter__count');
        let productPrice = item.querySelector('.cart-product__price');

        if (item.getAttribute('data-product-id') === cartItem.product.id) {
          productCount.textContent = cartItem.count;
          productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        }
      })

      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) {
        document.querySelector(`[data-product-id=${cartItem.product.id}]`).remove();
      }

      if (this.getTotalCount() === 0) {
        this.modal.close();
        return;
      }
    }
  }

  async onSubmit(event) {

    event.preventDefault();

    let btnSubmit = this.cartBody.querySelector('button[type="submit"]');
    let cartForm = this.cartBody.querySelector('.cart-form');

    btnSubmit.classList.add("is-loading");

    await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm)
    }).then(responce => {
      if (responce.ok === true) {
        this.modal.setTitle("Success!");
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`));
      }
    })
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

