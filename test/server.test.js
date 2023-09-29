import supertest from 'supertest';

const request = supertest('http://localhost:3001');

test('Deve responder na porta 3001', () => {
  // acessar a url http://localhost:3001
  return request.get('/')
    // verificar que a resposta foi 200
    .then(res => expect(res.status).toBe(200));
});
