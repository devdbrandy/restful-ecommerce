import { Router } from 'express';
import Validator from '../../middlewares/validator';
import Controller from './orders.controller';

const router = Router();

/* List of orders */
router.get('/orders', Controller.getOrders());

/* Get a single product */
router.get('/orders/:id', Validator.validate('idParam'), Controller.getOrder());

/* Place an order */
router.post(
  '/orders',
  // Validator.validate('createProduct'),
  Controller.placeOrder()
);

/* Cancel an order */
router.post('/orders/:id/cancel', Controller.cancelOrder());

/* Update a specific order */
router.patch(
  '/orders/:id',
  Validator.validate('idParam'),
  Controller.updateOrder()
);

export default router;
