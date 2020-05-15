export default class CartItem {
  constructor({ items = [], totalAmount = 0 } = {}) {
    this.items = items;
    this.totalAmount = totalAmount;
  }

  inCart(productId = 0) {
    return this.items.some(item => item.id === productId);
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.items.forEach(item => {
      const { price, qty } = item;
      const amount = price * qty;

      this.totalAmount += amount;
    });
  }

  addToCart(product = null, quantity = 1) {
    const qty = +quantity;

    if (!this.inCart(product.id)) {
      const item = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        qty
      };

      this.items.push(item);
      this.calculateTotalAmount();
    } else {
      const index = this.items.findIndex(item => item.id === product.id);
      const amount = product.price * qty;
      this.totalAmount += amount;
      this.items[index].qty += qty;
    }
    return this;
  }

  removeCartItem(productId) {
    const productIndex = this.items.findIndex(item => item.id === productId);
    const [product] = this.items.splice(productIndex, 1);

    this.totalAmount -= product.price * product.qty;
    return this;
  }

  updateCart(payload) {
    const { productId, qty } = payload;
    const productIndex = this.items.findIndex(item => item.id === productId);

    if (productIndex === -1) {
      return false;
    }

    this.items[productIndex].qty = qty;
    this.totalAmount = this.items[productIndex].price * qty;
    return this;
  }
}
