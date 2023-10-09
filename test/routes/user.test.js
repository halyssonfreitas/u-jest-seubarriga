import supertest from 'supertest';
import app from '../../src/app.js';

const name = 'Halysson Freitas';
const passwd = '123456';

test('Deve listar todos os usuários', () => {
  return supertest(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name', name);
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

test('Não deve inserir usuário sem nome', () => {
  return supertest(app).post('/users')
    .send({ email: 'halyssonfreitas@gmail.com', passwd })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

// test('Não deve inserir usuário sem email', async () => {
//   const res = await request(app).post('/users')
//     .send({ name, passwd });
//   expect(res.status).toBe(400);
//   expect(res.body.error).toBe('Email é um atributo obrigatórios');
// });
