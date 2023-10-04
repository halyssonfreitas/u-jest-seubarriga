import users from '../routes/users';

export default (app) => {
  app.route('/users')
    .get(users.findAll)
    .post(users.create);
};
