import bodyParser from 'body-parser';
import kenxLogger from 'knex-logger';

export default (app) => {
  app.use(bodyParser.json());
  app.use(kenxLogger(app.db));
};
