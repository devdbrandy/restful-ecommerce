import { User } from '@prisma/client'
import { Request as ExpressRequest } from 'express'
export const API_VERSION = 'v1'

export type Request = ExpressRequest & { user: User }

export const messages = {
    APP_SERVER_ERROR: 'Something went wrong.',
    NOT_FOUND: `Not Found. Use /api/${API_VERSION} to access the api resource`,
    USER_NOT_FOUND: `User not found.`,
    INVALID_PASSWORD: `Invalid password.`,
    USER_ALREADY_EXISTS: `User already exists.`,

    RESOURCE_FOUND: 'Resource(s) found',
    RESOURCE_NOT_FOUND: 'No resource(s) found',

    OUT_OF_BOUND: 'Operation out of bound',

    WELCOME_MESSAGE: 'Welcome to Restful Ecommerce API',

    NO_AUTH_TOKEN:
        'Access denied! Missing or invalid token. Token must be in the format: Bearer <token>.',
    INVALID_AUTH_TOKEN: 'Authentication failure: Invalid or expired token 🐵.',
    INVALID_CREDENTIALS: 'Your username or password is incorrect.',

    ACCESS_DENIED: 'Access denied!',
}
