import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import UserService from '@services/user.service';
import JWTService from '@services/jwt.service';

import { messages } from '@helpers/constants';

/**
 * Auth Service Module
 *
 * @export
 * @class AuthService
 */
class AuthService {
  static async register(user) {
    // create and persist user
    const newUser = await UserService.create(user, { plain: true });

    // generate jwt token from user payload
    const token = JWTService.sign(newUser);
    return { ...newUser, token };
  }

  static async login(email, password) {
    // fetch user data
    const user = await UserService.getByEmail(email, { plain: true });

    // compare password
    if (!bcrypt.compareSync(password, user.password)) {
      const { INVALID_CREDENTIALS } = messages;
      throw createError(403, INVALID_CREDENTIALS);
    }

    // generate jwt token from user payload
    delete user.password;
    const token = JWTService.sign(user);
    return { ...user, token };
  }
}

export default AuthService;
