import AuthService from '@services/auth.service';
import BaseController from '../base-controller';

class AuthController extends BaseController {
  register() {
    return this.asyncWrapper(async (req, res) => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const payload = await AuthService.register(user);

      this.sendResponse(res, payload, undefined, 201);
    });
  }

  login() {
    return this.asyncWrapper(async (req, res) => {
      const { email, password } = req.body;
      const payload = await AuthService.login(email, password);

      this.sendResponse(res, payload);
    });
  }
}

const controller = new AuthController(AuthService);
export default controller;
