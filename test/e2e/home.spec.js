import request from 'supertest';
import app from '@src/app';
import { messages } from '@helpers/constants';

const server = () => request(app);

describe('HomePage', () => {
  it('should respond with welcome message', done => {
    const { WELCOME_MESSAGE } = messages;

    server()
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message', WELCOME_MESSAGE);
        done();
      });
  });
});

describe('/404', () => {
  it('should respond with 404 Not found', done => {
    const { NOT_FOUND } = messages;

    server()
      .get('/404')
      .expect(404)
      .end((err, res) => {
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', NOT_FOUND);
        done();
      });
  });
});
