import supertest from 'supertest';
import app from '../../src/app.js';

const name = 'Halysson Freitas';
const passwd = '123456';

test('Deve listar todos os usuários', () => {
  return supertest(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name', 'Halysson Freitas');
    });
});

test('Deve inserir usuário com sucesso', () => {
  const email = `${Date.now()}@gmail.com`;
  return supertest(app).post('/users')
    .send({ name, email, passwd })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(name);
    });
});
