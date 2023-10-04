const bodyParser = require('body-parser');

export default (app) => {
  app.use(bodyParser.json());
};
