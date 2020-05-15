import { Router } from 'express';
import AuthGuard from '@middlewares/authenticate';
import Validator from '@middlewares/validator';
import Controller from './users.controller';

const router = Router();

/* List of users */
router.get('/users', Controller.getAllUsers());

/* Get a single user */
router.get('/users/:id', Validator.validate('idParam'), Controller.getUser());

/* Create a user */
router.post(
  '/users',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('createUser'),
  Controller.createUser()
);

/* Edit a user */
router.put(
  '/users/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.updateUser()
);

/* Delete a user */
router.delete(
  '/users/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.destroyUser()
);

export default router;
