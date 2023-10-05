import express from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';
import middlewareConfig from './config/middlewares.js';
import routesConfig from './config/routes.js';

const app = express();

// TODO criar chaveamento dinâmico
app.db = knex(knexfile.test);

middlewareConfig(app);
routesConfig(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

export default app;
