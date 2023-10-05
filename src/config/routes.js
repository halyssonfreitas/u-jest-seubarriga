import usersRoutesFunction from '../routes/users';

const usersRoutes = usersRoutesFunction();

export default (app) => {
  app.route('/users')
    .get(usersRoutes.findAll)
    .post(usersRoutes.create);
};
