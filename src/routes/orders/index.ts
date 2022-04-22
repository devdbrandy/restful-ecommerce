import { Router } from 'express'
import AuthGuard from '../../middlewares/authenticate'
import Validator from '../../middlewares/validator'
import {
    getOrders,
    placeOrder,
    cancelOrder,
    updateOrder,
    getOrder,
} from './orders.controller'

const router = Router()

/* List of orders */
router.get('/orders', AuthGuard.verifyToken, getOrders)

/* Get a specific order */
router.get(
    '/orders/:id',
    AuthGuard.verifyToken,
    Validator.validate('idParam'),
    getOrder
)

/* Place an order */
router.post('/orders', AuthGuard.verifyToken, placeOrder)

/* Cancel an order */
router.post('/orders/:id/cancel', AuthGuard.verifyToken, cancelOrder)

/* Update a specific order */
router.patch(
    '/orders/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    updateOrder
)

export default router
