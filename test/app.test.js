import supertest from 'supertest';
import app from '../src/app.js';

test('Deve responder na raiz', () => supertest(app).get('/')
  .then((res) => {
    expect(res.status).toBe(200);
  }));
