import { Router } from 'express';
import Validator from '../../middlewares/validator';
import Controller from './cart.controller';

const router = Router();

/* List products in cart */
router.get('/cart', Controller.getCart());

/* Add product to cart */
router.post('/cart/add', Validator.validate('addCart'), Controller.addToCart());

/* Add product to cart */
router.post(
  '/cart/update/:productId',
  Validator.validate('productIdParam'),
  Controller.updateCart()
);

/* Remove product from cart */
router.post(
  '/cart/remove/:productId',
  Validator.validate('productIdParam'),
  Controller.removeItem()
);

/* Clear cart */
router.patch('/cart/clear', Controller.clearCart());

export default router;
