import accountService from '../services/account-service.js';
import userService from '../services/user-service.js';

export default (app) => {
  app.setServices('user', userService);
  app.setServices('account', accountService);
};
