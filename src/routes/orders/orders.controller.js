import OrderService from '@services/order.service';
import ExceptionHandler from '@helpers/exception';
import BaseController from '../base-controller';

class OrdersController extends BaseController {
  /**
   * Fetch a list of orders
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  getOrders() {
    return this.asyncWrapper(async (req, res) => {
      const orders = await this.service.getAll({ plain: true });

      this.sendResponse(res, orders);
    });
  }

  /**
   * Fetch a specific order by id
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  getOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { id: productId }
      } = req;
      const product = await this.service.getById(productId, { plain: true });

      ExceptionHandler.throwErrorIfNull(product);

      this.sendResponse(res, product);
    });
  }

  /**
   * Place an order
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  placeOrder() {
    return this.asyncWrapper(async (req, res) => {
      const userId = 1;
      const order = await this.service.create({ userId });

      this.sendResponse(res, order, undefined, 201);
    });
  }

  /**
   * Cancel an order
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  cancelOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { id: orderId }
      } = req;
      const userId = 1;
      const order = await this.service.cancelOrder(userId, orderId);

      this.sendResponse(res, order);
    });
  }

  /**
   * Update an order
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  updateOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: orderId }
      } = req;
      const order = await this.service.update(orderId, body);

      this.sendResponse(res, order);
    });
  }
}

const controller = new OrdersController(OrderService);
export default controller;
