import middlewareConfig from './middlewares.js';
import routesConfig from './routes.js';
import servicesConfig from './services.js';

export default (app) => {
  servicesConfig(app);
  middlewareConfig(app);
  routesConfig(app);
};
