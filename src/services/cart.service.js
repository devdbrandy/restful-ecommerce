import models from '@models';
import ExceptionHandler from '@helpers/exception';
import BaseService from './base.service';
import ProductService from './product.service';
import CartItem from './cart-item';

class CartService extends BaseService {
  async cart(userId, options = {}) {
    const cart = await super.find({ userId }, options);
    return cart;
  }

  /**
   * Add product to cart
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof CartService
   */
  async addToCart(data, options) {
    const { userId, productId, qty } = data;

    const [result] = await this.model.findOrCreate({
      where: { userId: +userId },
      defaults: { cartItem: new CartItem() }
    });

    const cartData = JSON.parse(result.dataValues.cartItem);
    const cartItem = new CartItem(cartData);

    const product = await ProductService.getById(productId, { plain: true });

    ExceptionHandler.throwErrorIfNull(product);

    const cart = cartItem.addToCart(product, qty);

    result.cartItem = cart;
    result.save();

    return result;
  }

  async updateCart(userId, payload) {
    const cart = await super.find({ userId });
    const cartItem = new CartItem(cart.cartItem);
    const result = cartItem.updateCart(payload);

    ExceptionHandler.throwErrorIfNull(result);

    cart.cartItem = result;
    cart.save();

    return cart;
  }

  async removeItem(userId, productId) {
    const cart = await super.find({ userId });

    ExceptionHandler.throwErrorIfNull(cart);

    const cartItem = new CartItem(cart.cartItem);
    const result = cartItem.removeCartItem(productId);

    cart.cartItem = result;
    cart.save();

    return cart;
  }

  async clearCart(cartKey) {
    const cartItem = new CartItem();
    let cart = cartKey;

    if (typeof cartKey === 'number') {
      cart = await super.find({ userId: cartKey });
    }

    cart.cartItem = cartItem;
    cart.save();

    return cart;
  }
}

const { Cart } = models;
export default new CartService(Cart);
