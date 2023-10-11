import supertest from 'supertest';
import app from '../../src/app';

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const res = await app.services.user.create(
    {
      name: 'User Account',
      email: `${Date.now()}@mail.com`,
      passwd: '123',
    },
  );
  user = { ...res };
});

test('Deve inserir uma conta com sucesso', (done) => {
  supertest(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
      done();
    });
});

test('Deve listar todas as contas', async () => {
  await app.db('accounts').insert({ name: 'Acc list', user_id: user.id });
  const result = await supertest(app).get(MAIN_ROUTE);
  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThan(0);
  expect(result.body.pop().name).toBe('Acc list');
});
