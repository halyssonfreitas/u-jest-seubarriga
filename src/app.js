import express from 'express';
import middlewareAdd from './config/middleware.js';
import routesConfig from './config/routes.js';

const app = express();

middlewareAdd(app);
routesConfig(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

export default app;
