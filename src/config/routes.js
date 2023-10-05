import usersRoutesFunction from '../routes/users.js';

export default (app) => {
  const usersRoutes = usersRoutesFunction(app);
  app.route('/users')
    .get(usersRoutes.findAll)
    .post(usersRoutes.create);
};
