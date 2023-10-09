export default (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll()
      .then((result) => {
        if (result.error) return res.status(400).json(result);
        return res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    const user = await app.services.user.create(req.body);
    res.status(201).json(user);
  };

  return { findAll, create };
};
