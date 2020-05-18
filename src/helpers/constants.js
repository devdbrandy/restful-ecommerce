export const API_VERSION = 'v1';

export const messages = {
  APP_SERVER_ERROR:
    'Oops, something Went Wrong! Our monkeys (🐵🐵) are working hard to fix the issue.',
  NOT_FOUND: `Not Found. Use /api/${API_VERSION} to access the api resource`,

  RESOURCE_FOUND: 'Resource(s) found',
  RESOURCE_NOT_FOUND: 'No resource(s) found',

  OUT_OF_BOUND: 'Operation out of bound',

  WELCOME_MESSAGE: 'Welcome to Restful Ecommerce API',

  NO_AUTH_TOKEN:
    'Access denied! Missing or invalid token. Token must be in the format: Bearer <token>.',
  INVALID_AUTH_TOKEN: 'Authentication failure: Invalid or expired token 🐵.',
  INVALID_CREDENTIALS: 'Your username or password is incorrect.',

  ACCESS_DENIED: 'Access denied!'
};
