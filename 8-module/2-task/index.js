import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
      </div>
  </div>`);
    this.products = products;
    this.filters = {};
    this.gridInner = this.elem.querySelector('.products-grid__inner');
    this.product(products);
  }

  product(array) {
    array.forEach(product => {
      let inner = new ProductCard(product);
      this.gridInner.append(inner.elem);
    })
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let products = this.products.filter((elem) => {
      if ((!this.filters.noNuts || this.filters.noNuts !== elem.nuts) &
        (!this.filters.vegeterianOnly ||
          this.filters.vegeterianOnly === elem.vegeterian) &
        (!this.filters.maxSpiciness ||
          elem.spiciness <= this.filters.maxSpiciness) &
        (!this.filters.category || this.filters.category === elem.category)) {
        return true;
      }
    });
    this.gridInner.innerHTML = '';
    this.product(products);
  }
}

