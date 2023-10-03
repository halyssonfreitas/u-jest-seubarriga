import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/users', (req, res) => {
  const users = [
    { name: 'Halysson Freitas', email: 'halyssonfreitas@senseup.tech' },
  ];
  res.status(200).send(users);
});

app.post('/users', (req, res) => {
  res.status(201).json(req.body);
});

export default app;
