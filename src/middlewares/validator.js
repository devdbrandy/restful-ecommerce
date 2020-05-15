import { param, body, validationResult } from 'express-validator';

export default class Validator {
  static get routes() {
    return {
      idParam: [param('id', 'Invalid resource id param').isNumeric()],
      productIdParam: [
        param('productId', 'Invalid resource productId param').isNumeric()
      ],
      createUser: [...Validator.userResource()],
      createProduct: [...Validator.productResource()],

      addCart: [
        body(
          'productId',
          "'productId' is required and must be an integer"
        ).isNumeric(),
        body('qty', "'qty' is required and must be an integer").isNumeric()
      ],

      register: [
        ...Validator.userResource(),
        body('passwordConfirmation').custom((value, { req }) => {
          if (value !== req.body.password) {
            // throw error if passwords do not match
            throw new Error('Passwords do not match');
          }
          return true;
        })
      ],
      login: [
        body('email', 'Invalid email address').isEmail(),
        body(
          'password',
          "'password' is required and must exceed 4 characters"
        ).isLength(5)
      ]
    };
  }

  static userResource() {
    return [
      body(
        'firstName',
        "'firstName' is required and must exceed 2 characters"
      ).isLength(3),
      body(
        'lastName',
        "'lastName' is required and must exceed 2 characters"
      ).isLength(3),
      body('email', 'Invalid email address').isEmail(),
      body(
        'password',
        "'password' is required and must exceed 4 characters"
      ).isLength(5)
    ];
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
      body('imageUrl', "'price' must be integer").isURL({
        require_protocol: true
      })
    ];
  }

  static validate(route) {
    return [Validator.routes[route], Validator.validationResult];
  }

  static validationResult(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  }
}
