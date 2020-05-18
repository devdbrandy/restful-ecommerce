import request from 'supertest';
import app from '@src/app';

export const server = () => request(app);
export const apiBase = '/api/v1';

export const auth = async user => {
  const res = await server()
    .post('/login')
    .send(user);

  return res.body.data.token;
};

export const addToCart = async (payload, token) => {
  const res = await server()
    .post(`${apiBase}/cart/add`)
    .set('Authorization', `Bearer ${token}`)
    .send(payload);

  return res.body.data;
};
