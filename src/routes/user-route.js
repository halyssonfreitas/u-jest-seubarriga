export default (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.user.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error).send();
    }
  };

  return { findAll, create };
};
