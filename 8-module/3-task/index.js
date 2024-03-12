export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

