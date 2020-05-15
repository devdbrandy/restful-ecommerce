import CartService from '@services/cart.service';
import ExceptionHandler from '@helpers/exception';
import BaseController from '../base-controller';

class CartController extends BaseController {
  /**
   * Fetch products in cart
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  getCart() {
    return this.asyncWrapper(async (req, res) => {
      const userId = 1;
      const cart = await this.service.cart(userId);

      ExceptionHandler.throwErrorIfNull(cart);

      this.sendResponse(res, cart);
    });
  }

  /**
   * Add product to cart
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof CartController
   */
  addToCart() {
    return this.asyncWrapper(async (req, res) => {
      const { body } = req;

      body.userId = 1;
      const cart = await this.service.addToCart(body);

      this.sendResponse(res, cart, undefined, 201);
    });
  }

  /**
   * Add product to cart
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof CartController
   */
  removeItem() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { productId }
      } = req;

      const userId = 1;
      const cart = await this.service.removeItem(userId, +productId);

      this.sendResponse(res, cart);
    });
  }

  /**
   * Add product to cart
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof CartController
   */
  updateCart() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { productId },
        body: { qty }
      } = req;

      const userId = 1;
      const payload = { productId: +productId, qty };
      const cart = await this.service.updateCart(userId, payload);

      this.sendResponse(res, cart);
    });
  }

  /**
   * Add product to cart
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof CartController
   */
  clearCart() {
    return this.asyncWrapper(async (req, res) => {
      const userId = 1;
      const cart = await this.service.clearCart(userId);

      this.sendResponse(res, cart);
    });
  }
}

const controller = new CartController(CartService);
export default controller;
