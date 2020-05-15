import jwt from 'jsonwebtoken';
import { env } from '@helpers/utils';

/**
 * JWT Service Module
 *
 * @export
 * @class JWTService
 */
class JWTService {
  /**
   * Synchronously sign the given payload into a JSON Web Token string payload
   *
   * @static
   * @param {object} payload - Payload to sign
   * @param {object} opts - Options for signature
   * @returns {string} A JSON Web Token string
   * @memberof JWTService
   */
  static sign(payload) {
    const privateKey = env('APP_PKEY', 'secret');
    const options = {
      issuer: env('APP_NAME', ''),
      audience: env('APP_URL', ''),
      expiresIn: '12h'
    };

    return jwt.sign({ user: payload }, privateKey, options);
  }

  /**
   * Synchronously verify a given token and return a decoded token
   *
   * @static
   * @param {string} token - JWT string to verify
   * @returns {object|boolean} Decoded token payload or false for invalid token
   * @memberof JWTService
   */
  static verify(token) {
    const privateKey = env('APP_PKEY', 'secret');
    const options = {
      issuer: env('APP_NAME', ''),
      audience: env('APP_URL', ''),
      expiresIn: '12h'
    };

    try {
      return jwt.verify(token, privateKey, options);
    } catch (err) {
      return false;
    }
  }
}

export default JWTService;
