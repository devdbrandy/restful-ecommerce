import { Router } from 'express'
import Validator from '../../middlewares/validator'
import { register, login } from './auth.controller'

const router = Router()

/* POST create user account. */
router.post('/register', Validator.validate('register'), register)

/* POST login user. */
router.post('/login', Validator.validate('login'), login)

export default router
