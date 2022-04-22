import { Router } from 'express'

import Validator from '../../middlewares/validator'
import AuthGuard from '../../middlewares/authenticate'
import {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
} from './products.controller'

const router = Router()

/* List of products */
router.get('/products', getAllProducts)

/* Get a single product */
router.get('/products/:slug', Validator.validate('slug'), getProductBySlug)

/* Create a product */
router.post(
    '/products',
    AuthGuard.verifyToken,
    Validator.validate('createProduct'),
    createProduct
)

/* Edit a specific product */
router.put(
    '/products/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    updateProduct
)

/* Delete a product */
router.delete(
    '/products/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    deleteProduct
)

export default router
