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
    try {
      const result = await app.services.accounts.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error).send();
    }
  };

  const update = async (req, res) => {
    try {
      const result = await app.services.accounts.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error).send();
    }
  };

  const remove = async (req, res) => {
    try {
      const result = await app.services.accounts.remove(req.params.id);
      return res.status(202).json(result);
    } catch (error) {
      return res.status(400).json(error).send();
    }
  };

  return {
    findAll, find, create, update, remove,
  };
};
