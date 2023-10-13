import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../../src/app.js';

const name = 'Halysson Freitas';
const passwd = '123456';
const email = `${Date.now()}@gmail.com`;

function generateEmail() {
  return `${Date.now()}@gmail.com`;
}

test('Deve listar todos os usuários', () => {
  return supertest(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name', name);
      expect(res.body[0]).not.toHaveProperty('passwd');
    });
});

test('Deve inserir usuário com sucesso', () => {
  return supertest(app).post('/users')
    .send({ name, email, passwd })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body[0].name).toBe(name);
      expect(res.body[0]).not.toHaveProperty('passwd');
    });
});

test('Deve armazenar senha criptografada', async () => {
  const res = await supertest(app).post('/users')
    .send({ name, email: generateEmail(), passwd });
  expect(res.status).toBe(201);

  const { id } = res.body[0];

  const userDB = await app.services
    .user.findOneByIdWithPasswd(id);

  expect(userDB.passwd).not.toBeUndefined();
  expect(passwd).not.toBe(userDB.passwd);
  expect(bcrypt.compareSync(passwd, userDB.passwd, (err, result) => result))
    .toBeTruthy();
});

test('Não deve inserir usuário sem nome', () => {
  return supertest(app).post('/users')
    .send({ email: 'halyssonfreitas@gmail.com', passwd })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const res = await supertest(app).post('/users')
    .send({ name, passwd });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', (done) => {
  supertest(app).post('/users')
    .send({ name, email: 'halyssonfreitas@gmail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch((err) => done.fail(err));
});

test('Não deve inserir usuário com email existente', () => {
  return supertest(app).post('/users')
    .send({ name, email, passwd })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Já existe um usuário com esse email');
    });
});
