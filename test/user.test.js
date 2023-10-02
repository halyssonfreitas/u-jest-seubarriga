import supertest from 'supertest';
import app from '../src/app.js';

test('Deve listar todos os usuários', () => {
  return supertest(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('name', 'Halysson Freitas');
    });
});
