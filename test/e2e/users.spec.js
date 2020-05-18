import models from '@models';
import UserFactory, { userFactory } from '@factories/user';
import JWTService from '@services/jwt.service';
import { server, apiBase, auth } from '../support';

let mockAdmin;
let mockUser;
let authToken;

beforeAll(async () => {
  const adminUser = await UserFactory(
    { email: 'admin@users.com', isAdmin: true },
    false
  );
  mockUser = await UserFactory({}, true);

  mockAdmin = adminUser.get();
  authToken = await auth({
    email: mockAdmin.email,
    password: 'secret'
  });
});

afterAll(() => {
  models.sequelize.close();
});

describe('GET /users', () => {
  it('should fetch a list of users', done => {
    server()
      .get(`${apiBase}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toBeInstanceOf(Array);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should fetch a single user resource', done => {
    const { id } = mockUser;

    server()
      .get(`${apiBase}/users/${id}`)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toHaveProperty('firstName', mockUser.firstName);
        expect(res.body.data).toHaveProperty('lastName', mockUser.lastName);
        expect(res.body.data).toHaveProperty('email', mockUser.email);
        done();
      });
  });
});

describe('POST /users', () => {
  it('should create a new user resource', done => {
    const userData = userFactory();
    jest.spyOn(JWTService, 'sign').mockReturnValue('token');

    server()
      .post(`${apiBase}/users`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('PUT /users/:id', () => {
  it('should update a specific user resource', done => {
    const { id } = mockUser;
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com'
    };

    server()
      .put(`${apiBase}/users/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a single user resource', done => {
    const { id: userId } = mockUser;
    server()
      .delete(`${apiBase}/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
});
