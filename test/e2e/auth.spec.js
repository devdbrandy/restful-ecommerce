import models from '@models';
import UserFactory, { userFactory } from '@factories/user';
import JWTService from '@services/jwt.service';
import { server } from '../support';

let mockUser;

beforeAll(async () => {
  mockUser = await UserFactory({}, true);
});

afterAll(() => {
  models.sequelize.close();
});

describe('POST /register', () => {
  it('should register new user account', done => {
    const userData = userFactory({
      password: 'secret',
      passwordConfirmation: 'secret'
    });
    jest.spyOn(JWTService, 'sign').mockReturnValue('token');

    server()
      .post('/register')
      .send(userData)
      .expect(201, done);
  });
});

describe('POST /login', () => {
  it('should login user', done => {
    const loginCredential = {
      email: mockUser.email,
      password: 'secret'
    };
    jest.spyOn(JWTService, 'sign').mockReturnValue('token');

    server()
      .post('/login')
      .send(loginCredential)
      .expect(200, done);
  });
});
