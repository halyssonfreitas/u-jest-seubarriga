import express from 'express';
import knex from 'knex';
import kenxLogger from 'knex-logger';
import knexfile from '../knexfile.js';
import middlewareConfig from './config/middlewares.js';
import routesConfig from './config/routes.js';
import accountService from './services/account-service.js';
import userService from './services/user-service.js';

const app = express();

// TODO criar chaveamento dinâmico
app.db = knex(knexfile.test);
app.use(kenxLogger(app.db));

app.services = {};
app.services.user = userService(app);
app.services.accounts = accountService(app);

middlewareConfig(app);
routesConfig(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

export default app;
