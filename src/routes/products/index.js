import { Router } from 'express';

import Validator from '@middlewares/validator';
import AuthGuard from '@middlewares/authenticate';
import Controller from './products.controller';

const router = Router();

/* List of products */
router.get('/products', Controller.getAllProducts());

/* Get a single product */
router.get(
  '/products/:id',
  Validator.validate('idParam'),
  Controller.getProduct()
);

/* Create a product */
router.post(
  '/products',
  AuthGuard.verifyToken,
  Validator.validate('createProduct'),
  Controller.createProduct()
);

/* Edit a specific product */
router.put(
  '/products/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.updateProduct()
);

/* Delete a product */
router.delete(
  '/products/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.destroyProduct()
);

export default router;
