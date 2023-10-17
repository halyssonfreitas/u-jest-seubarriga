import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import supertest from 'supertest';
import app from '../../src/app';

const name = 'Halysson Freitas';
const passwd = 'x1c2v3b4n5m6';
const email = `${Date.now()}@gmail.com`;

test('Deve receber token ao logar', async () => {
  const userDB = (await app.services.user.create({ name, passwd, email }))[0];
  const response = await supertest(app)
    .post('/auth/signin')
    .send({ email, passwd });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
  const privateKey = fs.readFileSync(path.resolve('./ssh-keys/id_rsa'));
  console.log(response.body.token);
  const decoded = jwt.verify(response.body.token, privateKey);
  expect(decoded.id).toBe(userDB.id);
  expect(decoded.name).toBe(userDB.name);
  expect(decoded.email).toBe(userDB.email);
});
