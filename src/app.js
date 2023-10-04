import express from 'express';
import middlewareConfig from './config/middlewares.js';
import routesConfig from './config/routes.js';

const app = express();

middlewareConfig(app);
routesConfig(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

export default app;
