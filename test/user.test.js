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

test('Deve inserir usuário com sucesso', () => {
  const userNameToCreate = 'Walt Disney';
  const userEmailToCreate = 'waltdisney@gmail.com';
  return supertest(app).post('/users')
    .send({ name: userNameToCreate, email: userEmailToCreate })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(userNameToCreate);
    });
});
