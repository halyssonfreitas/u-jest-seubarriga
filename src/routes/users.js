export default (app) => {
  const findAll = (req, res) => {
    const users = [
      { name: 'Halysson Freitas', email: 'halyssonfreitas@senseup.tech' },
    ];
    res.status(200).send(users);
  };

  const create = (req, res) => {
    res.status(201).json(req.body);
  };

  return { findAll, create };
};
