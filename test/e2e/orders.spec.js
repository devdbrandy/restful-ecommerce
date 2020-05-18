import models from '@models';
import UserFactory from '@factories/user';
import ProductFactory from '@factories/product';
import { server, apiBase, auth, addToCart } from '../support';

let mockUser;
let mockProduct;
let authToken;
let mockOrder;

beforeAll(async () => {
  const user = await UserFactory({ isAdmin: true }, false);
  mockProduct = await ProductFactory({}, true);

  mockUser = user.get();
  authToken = await auth({
    email: mockUser.email,
    password: 'secret'
  });

  // add product to user cart
  const payload = { productId: mockProduct.id, qty: 2 };
  await addToCart(payload, authToken);
});

afterAll(() => {
  models.sequelize.close();
});

describe('POST /orders', () => {
  it('should place order', done => {
    server()
      .post(`${apiBase}/orders`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .end((err, res) => {
        mockOrder = res.body.data;
        done();
      });
  });
});

describe('GET /orders/:orderId', () => {
  it('should fetch a single user order by id', done => {
    const { id: orderId } = mockOrder;

    server()
      .get(`${apiBase}/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});

describe('GET /orders', () => {
  it('should fetch user orders', done => {
    server()
      .get(`${apiBase}/orders`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        done();
      });
  });
});

describe('POST /orders/:orderId/cancel', () => {
  it('should cancel order', done => {
    const { id: orderId } = mockOrder;

    server()
      .post(`${apiBase}/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});

describe('PATCH /orders/:orderId', () => {
  it('should update order', done => {
    const { id: orderId } = mockOrder;

    server()
      .patch(`${apiBase}/orders/${orderId}`)
      .send({ status: 'completed' })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});
