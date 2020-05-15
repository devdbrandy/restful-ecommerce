import createError from 'http-errors';
import JWTService from '@services/jwt.service';
import { messages } from '@helpers/constants';

const { NO_AUTH_TOKEN, INVALID_AUTH_TOKEN, ACCESS_DENIED } = messages;

export default class AuthGuard {
  /**
   * A middleware to determine if the request is made by an authenticated user
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @param {Function} next - Calls the next middleware function in the stack
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static async verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');

    try {
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw createError(401, NO_AUTH_TOKEN);
      }

      const token = authHeader.split(' ').pop();
      const decoded = JWTService.verify(token);

      if (!decoded) {
        throw createError(401, INVALID_AUTH_TOKEN);
      }

      req.user = decoded.user;
      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * A middleware to determine if the request is made by an admin user
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @param {Function} next - Calls the next middleware function in the stack
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static async adminOnly(req, res, next) {
    const { user } = req;

    try {
      if (!user.isAdmin) {
        throw createError(403, ACCESS_DENIED);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
}
