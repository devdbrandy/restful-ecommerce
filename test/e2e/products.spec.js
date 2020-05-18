import models from '@models';
import UserFactory from '@factories/user';
import ProductFactory, { productFactory } from '@factories/product';
import { server, apiBase, auth } from '../support';

let mockAdmin;
let mockProduct;
let authToken;

beforeAll(async () => {
  const adminUser = await UserFactory(
    { email: 'admin@products.com', isAdmin: true },
    false
  );
  mockProduct = await ProductFactory({}, true);

  mockAdmin = adminUser.get();
  authToken = await auth({
    email: mockAdmin.email,
    password: 'secret'
  });
});

afterAll(() => {
  models.sequelize.close();
});

describe('GET /products', () => {
  it('should fetch a list of products', done => {
    server()
      .get(`${apiBase}/products`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toBeInstanceOf(Array);
        done();
      });
  });
});

describe('GET /products/:id', () => {
  it('should fetch a single product resource', done => {
    const { id: productId } = mockProduct;

    server()
      .get(`${apiBase}/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('POST /products', () => {
  it('should create a new product resource', done => {
    const productData = productFactory();

    server()
      .post(`${apiBase}/products`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(productData)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('PUT /products/:id', () => {
  it('should update a specific product resource', done => {
    const { id: productId } = mockProduct;
    const productData = productFactory();

    server()
      .put(`${apiBase}/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(productData)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        done();
      });
  });
});

describe('DELETE /products/:id', () => {
  it('should delete a single product resource', done => {
    const { id: productId } = mockProduct;

    server()
      .delete(`${apiBase}/products/${productId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
});
