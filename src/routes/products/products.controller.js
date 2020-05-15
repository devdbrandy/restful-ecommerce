import ProductService from '@services/product.service';
import ExceptionHandler from '@helpers/exception';
import BaseController from '../base-controller';

class ProductsController extends BaseController {
  /**
   * Fetch a list of users
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  getAllProducts() {
    return this.asyncWrapper(async (req, res) => {
      const products = await this.service.getAll({ plain: true });

      this.sendResponse(res, products);
    });
  }

  /**
   * Fetch a specific user by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  getProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { id: productId } = req.params;
      const product = await this.service.getById(productId, { plain: true });

      ExceptionHandler.throwErrorIfNull(product);

      this.sendResponse(res, product);
    });
  }

  /**
   * Create a new user
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  createProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { body } = req;
      const product = await this.service.create(body, { plain: true });

      this.sendResponse(res, product, undefined, 201);
    });
  }

  /**
   * Update a user resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  updateProduct() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: productId }
      } = req;
      const product = await this.service.update(productId, body);

      this.sendResponse(res, product);
    });
  }

  /**
   * Remove a specific user
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  destroyProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { id: productId } = req.params;

      await this.service.delete(productId);
      this.sendResponse(res, null, null, 204);
    });
  }
}

const controller = new ProductsController(ProductService);
export default controller;
