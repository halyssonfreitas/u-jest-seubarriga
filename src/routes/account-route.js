export default (app) => {
  const findAll = (req, res, next) => {
    app.services.account.findAll()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => next(error));
  };

  const find = (req, res, next) => {
    app.services.account.findAll(req.params)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => next(error));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.account.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const result = await app.services.account.remove(req.params.id);
      return res.status(202).json(result);
    } catch (error) {
      return next(error);
    }
  };

  return {
    findAll, find, create, update, remove,
  };
};
