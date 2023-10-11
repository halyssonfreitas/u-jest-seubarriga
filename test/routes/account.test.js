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
  user = { ...res[0] };
});

test('Deve inserir uma conta com sucesso', (done) => {
  supertest(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body[0].name).toBe('Acc #1');
      done();
    });
});

test('Não deve inserir uma conta sem nome', async () => {
  return supertest(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then(async (result) => {
      expect(result.status).toBe(400);
      expect(result.body)
        .toHaveProperty('error', 'Nome é um atributo obrigatório');
    });
});

test('Deve listar todas as contas', async () => {
  await app.db('accounts').insert({ name: 'Acc list', user_id: user.id });
  const result = await supertest(app).get(MAIN_ROUTE);
  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThan(0);
  expect(result.body.pop().name).toBe('Acc list');
});

test('Deve retornar uma conta por Id', () => {
  return app.db('accounts')
    .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then((accountIds) => {
      return supertest(app).get(`${MAIN_ROUTE}/${accountIds[0].id}`);
    })
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(1);
      expect(result.body.pop().name).toBe('Acc By Id');
    });
});

test('Deve alterar uma conta', (done) => {
  const nameEdited = 'Acc edited';
  app.db('accounts')
    .insert({ name: 'Acc to edit', user_id: user.id }, ['id'])
    .then((accountsId) => {
      supertest(app)
        .put(`${MAIN_ROUTE}/${accountsId[0].id}`)
        .send({ name: nameEdited, user_id: user.id }, ['id'])
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done.fail(err);
          expect(res.body.pop().name).toBe(nameEdited);
          return done();
        });
    });
});

test('Deve remover uma conta', async () => {
  const accountsId = await app.db('accounts')
    .insert({ name: 'Acc to delete', user_id: user.id }, ['id']);
  await supertest(app)
    .delete(`${MAIN_ROUTE}/${accountsId[0].id}`)
    .send()
    .expect(202);
});
