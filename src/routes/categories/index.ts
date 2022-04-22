import { Router } from 'express'

import Validator from '../../middlewares/validator'
import AuthGuard from '../../middlewares/authenticate'
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from './categories.controller'

const router = Router()

/* List of products */
router.get('/products', getAllCategories)

/* Create a product */
router.post(
    '/products',
    AuthGuard.verifyToken,
    Validator.validate('createProduct'),
    createCategory
)

/* Edit a specific product */
router.put(
    '/products/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    updateCategory
)

/* Delete a product */
router.delete(
    '/products/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    deleteCategory
)

export default router
