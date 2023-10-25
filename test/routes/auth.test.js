import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import supertest from 'supertest';
import app from '../../src/app';

const name = 'Halysson Freitas';
const passwd = 'x1c2v3b4n5m6';
let email = `${Date.now()}@gmail.com`;

function generateEmail() {
  email = `${Date.now()}@gmail.com`;
}

test('Deve receber token ao logar', async () => {
  const userDB = (await app.services.user.create({ name, passwd, email }))[0];
  const response = await supertest(app)
    .post('/auth/signin')
    .send({ email, passwd });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
  const privateKey = fs.readFileSync(path.resolve('./ssh-keys/id_rsa'));
  const decoded = jwt.verify(response.body.token, privateKey);
  expect(decoded.id).toBe(userDB.id);
  expect(decoded.name).toBe(userDB.name);
  expect(decoded.email).toBe(userDB.email);
});

test('Não deve autenticar usuário com senha errada', async () => {
  generateEmail();
  await app.services.user.create({ name, passwd, email });
  const wrongPasswd = passwd.concat('X');
  const response = await supertest(app)
    .post('/auth/signin')
    .send({ email, passwd: wrongPasswd });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Login failed!');
});

test('Não deve autenticar usuário com email errado', async () => {
  const response = await supertest(app)
    .post('/auth/signin')
    .send({ email: 'naoExiste@mail.com', passwd: '123456' });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Login failed!');
});
