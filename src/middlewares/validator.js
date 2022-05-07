import { param, body, validationResult } from 'express-validator'

export default class Validator {
    static get routes() {
        return {
            idParam: [param('id', 'Invalid idParam').isNumeric()],
            slug: [param('slug', 'Invalid slug').isString()],
            productIdParam: [
                param(
                    'productId',
                    'Invalid resource productId param'
                ).isNumeric(),
            ],
            createUser: [...Validator.userResource()],
            createProduct: [...Validator.productResource()],
            createCategory: [...Validator.categoryResource()],

            addCart: [
                body(
                    'productId',
                    "'productId' is required and must be an integer"
                ).isNumeric(),
                body(
                    'qty',
                    "'qty' is required and must be an integer"
                ).isNumeric(),
            ],

            register: [
                ...Validator.userResource(),
                /* body('passwordConfirmation').custom((value, { req }) => {
                    if (value !== req.body.password) {
                        // throw error if passwords do not match
                        throw new Error('Passwords do not match')
                    }
                    return true
                }),
                */
            ],
            login: [
                body('email', 'Invalid email address').isEmail(),
                body(
                    'password',
                    'Password is required and must exceed 5 characters'
                ).isLength(6),
            ],
        }
    }

    static userResource() {
        return [
            body('email', 'Invalid email address').isEmail(),
            body(
                'password',
                'Password is required and must exceed 5 characters'
            ).isLength(6),
        ]
    }

    static productResource() {
        return [
            body(
                'title',
                "'title' is required and must exceed 2 characters"
            ).isLength(3),
            body(
                'description',
                "'description' is required and must exceed 4 characters"
            ).isLength(4),
            body('price', "'price' must be integer").isNumeric(),
            body('stock', "'stock' must be integer").isNumeric(),
            body('categoryId', "'categoryId' must be integer").isNumeric(),
            //body('imageUrl', "'price' must be integer").isURL({
            //   require_protocol: true,
            //}),
        ]
    }

    static categoryResource() {
        return [body('name', "'name' is required").isString()]
    }

    static validate(route) {
        return [Validator.routes[route], Validator.validationResult]
    }

    static validationResult(req, res, next) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        return next()
    }
}
