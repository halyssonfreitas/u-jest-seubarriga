import accountRoutFunction from '../routes/account-route.js';
import authRouteFunction from '../routes/auth-route.js';
import userRouteFunction from '../routes/user-route.js';

export default (app) => {
  // USER
  const userRoutes = userRouteFunction(app);
  app.route('/users')
    .get(userRoutes.findAll)
    .post(userRoutes.create);

  // ACCOUNTS
  const accountRoutes = accountRoutFunction(app);
  app.route('/accounts')
    .get(accountRoutes.findAll)
    .post(accountRoutes.create);
  app.route('/accounts/:id')
    .get(accountRoutes.find)
    .put(accountRoutes.update)
    .delete(accountRoutes.remove);

  // AUTH
  const authRoutes = authRouteFunction(app);
  app.route('/auth/signin')
    .post(authRoutes.signin);
};
