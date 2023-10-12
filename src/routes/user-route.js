export default (app) => {
  const findAll = (req, res, next) => {
    app.services.user.findAll()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => next(error));
  };

  const create = async (req, res, next) => {
    try {
      const result = await app.services.user.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  return { findAll, create };
};
