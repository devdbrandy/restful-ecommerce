import { Router } from 'express';
import AuthGuard from '@middlewares/authenticate';
import Validator from '@middlewares/validator';
import Controller from './orders.controller';

const router = Router();

/* List of orders */
router.get('/orders', AuthGuard.verifyToken, Controller.getOrders());

/* Get a specific order */
router.get(
  '/orders/:id',
  AuthGuard.verifyToken,
  Validator.validate('idParam'),
  Controller.getOrder()
);

/* Place an order */
router.post('/orders', AuthGuard.verifyToken, Controller.placeOrder());

/* Cancel an order */
router.post(
  '/orders/:id/cancel',
  AuthGuard.verifyToken,
  Controller.cancelOrder()
);

/* Update a specific order */
router.patch(
  '/orders/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.updateOrder()
);

export default router;
