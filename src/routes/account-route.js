export default (app) => {
  const findAll = (req, res) => {
    app.services.accounts.findAll()
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const find = (req, res) => {
    app.services.accounts.findAll(req.params)
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    const result = await app.services.accounts.create(req.body);
    if (result.error) return res.status(400).json(result).send();
    return res.status(201).json(result);
  };

  const update = async (req, res) => {
    const result = await app.services.accounts.update(req.params.id, req.body);
    if (result.error) return res.status(400).json(result).send();
    return res.status(200).json(result);
  };

  return {
    findAll, find, create, update,
  };
};
