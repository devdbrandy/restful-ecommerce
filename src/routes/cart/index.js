import { Router } from 'express';
import AuthGuard from '@middlewares/authenticate';
import Validator from '@middlewares/validator';
import Controller from './cart.controller';

const router = Router();

/* List products in cart */
router.get('/cart', AuthGuard.verifyToken, Controller.getCart());

/* Add product to cart */
router.post(
  '/cart/add',
  AuthGuard.verifyToken,
  Validator.validate('addCart'),
  Controller.addToCart()
);

/* Add product to cart */
router.post(
  '/cart/update/:productId',
  AuthGuard.verifyToken,
  Validator.validate('productIdParam'),
  Controller.updateCart()
);

/* Remove product from cart */
router.post(
  '/cart/remove/:productId',
  AuthGuard.verifyToken,
  Validator.validate('productIdParam'),
  Controller.removeItem()
);

/* Clear cart */
router.patch('/cart/clear', AuthGuard.verifyToken, Controller.clearCart());

export default router;
