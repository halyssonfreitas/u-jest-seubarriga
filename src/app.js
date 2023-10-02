import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/users', (req, res) => {
  const users = [
    { name: 'Halysson Freitas', email: 'halyssonfreitas@senseup.tech' },
  ];
  res.status(200).send(users);
});

export default app;
