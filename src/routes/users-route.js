export default (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    const result = await app.services.user.create(req.body);
    if (result.error) return res.status(400).json(result).send();
    return res.status(201).json(result);
  };

  return { findAll, create };
};
