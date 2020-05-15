import createError from 'http-errors';
import { DatabaseError, UniqueConstraintError } from 'sequelize';
import Response from '@helpers/response';
import { messages } from './constants';

const { RESOURCE_NOT_FOUND, OUT_OF_BOUND } = messages;

export default class Exception {
  /**
   * Validates that a given data is valid, else throws exception
   *
   * @static
   * @param {object|string|number} data - The specific data to validate
   * @param {Array} [message=RESOURCE_NOT_FOUND] - A list of error message & code to display
   * @param {number} [code=404] - The http status code
   * @memberof ExceptionHandler
   */
  static throwErrorIfNull(data, message = RESOURCE_NOT_FOUND, code = 404) {
    if (!data || data === -1) {
      throw createError(code, message);
    }
    return true;
  }

  /**
   * Validates that a given data is valid, else throws exception
   *
   * @static
   * @param {object|string|number} data - The specific data to validate
   * @param {Array} [message=RESOURCE_NOT_FOUND] - A list of error message & code to display
   * @param {number} [code=404] - The http status code
   * @memberof ExceptionHandler
   */
  static throwOperationOutOfBound() {
    throw createError(403, OUT_OF_BOUND);
  }

  /**
   * A middleware for handling exception. All errors are forwarded to this function
   *
   * @static
   * @returns {Function} - Express exception middleware
   * @memberof ExceptionHandler
   */
  static handleError() {
    return (error, req, res, next) => {
      if (res.headersSent) {
        return next(error);
      }

      return Response.sendError(res, error);
    };
  }

  /**
   * A middleware for handling database errors
   *
   * @static
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof Exception
   */
  static handleDatabaseError() {
    return (error, req, res, next) => {
      if (error instanceof DatabaseError) {
        error.statusCode = 503;
        return Response.sendError(res, error);
      }
      return next(error);
    };
  }

  /**
   * A middleware for handling database unique constraint errors
   *
   * @static
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof Exception
   */
  static handleDatabaseUniqueError() {
    return (error, req, res, next) => {
      if (error instanceof UniqueConstraintError) {
        error.statusCode = 400;
        delete error.errors;
        return Response.sendError(res, error);
      }
      return next(error);
    };
  }
}
