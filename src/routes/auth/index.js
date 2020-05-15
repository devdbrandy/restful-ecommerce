import { Router } from 'express';
import Validator from '../../middlewares/validator';
import Controller from './auth.controller';

const router = Router();

/* POST create user account. */
router.post('/register', Validator.validate('register'), Controller.register());

/* POST login user. */
router.post('/login', Validator.validate('login'), Controller.login());

export default router;
