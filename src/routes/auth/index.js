import { Router } from 'express';
import Validator from '../../middlewares/validator';
import Controller from './auth.controller';

const router = Router();

/* POST authenticate user. */
// router.post('/login', Validator.validate('login'), Controller.login);
router.post('/login', Validator.validate('login'), Controller.login());

export default router;
