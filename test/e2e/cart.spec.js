import models from '@models';
import UserFactory from '@factories/user';
import ProductFactory from '@factories/product';
import { server, apiBase, auth } from '../support';

let mockUser;
let mockProduct;
let authToken;

beforeAll(async () => {
  mockUser = await UserFactory({}, true);
  mockProduct = await ProductFactory({}, true);

  authToken = await auth({
    email: mockUser.email,
    password: 'secret'
  });
});

afterAll(() => {
  models.sequelize.close();
});

describe('POST /cart', () => {
  it('should add product to cart', done => {
    const { id: productId } = mockProduct;
    const payload = { productId, qty: 2 };

    server()
      .post(`${apiBase}/cart/add`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(payload)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('GET /cart', () => {
  it('should fetch user cart', done => {
    server()
      .get(`${apiBase}/cart`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('POST /cart/update/:productId', () => {
  it('should update product quantity', done => {
    const { id: productId } = mockProduct;

    server()
      .post(`${apiBase}/cart/update/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ qty: 2 })
      .expect(200, done);
  });
});

describe('POST /cart/remove/:productId', () => {
  it('should remove product from cart', done => {
    const { id: productId } = mockProduct;

    server()
      .post(`${apiBase}/cart/remove/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});

describe('POST /cart/clear', () => {
  it('should remove clear cart', done => {
    server()
      .patch(`${apiBase}/cart/clear`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});
