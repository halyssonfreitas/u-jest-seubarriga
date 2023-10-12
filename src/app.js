import express from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';
import config from './config/index.js';

const app = express();

// TODO criar chaveamento dinâmico
app.db = knex(knexfile.test);
app.services = {};
app.setServices = (index, fn) => { app.services[index] = fn(app); };

config(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

export default app;
