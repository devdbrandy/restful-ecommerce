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

/* List of categories */
router.get('/categories', getAllCategories)

/* Create a category */
router.post(
    '/categories',
    AuthGuard.verifyToken,
    Validator.validate('createCategory'),
    createCategory
)

/* Edit a specific category */
router.put(
    '/categories/:id',
    AuthGuard.verifyToken,
    AuthGuard.adminOnly,
    Validator.validate('idParam'),
    updateCategory
)

/* Delete a category */
router.delete(
    '/categories/:id',
    //AuthGuard.verifyToken,
    //AuthGuard.adminOnly,
    Validator.validate('idParam'),
    deleteCategory
)

export default router
