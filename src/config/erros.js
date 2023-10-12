export default (app) => {
  app.use((err, req, res, next) => {
    const { name, error, stack } = err;
    if (name === 'ValidationError') res.status(400).json(err);
    else res.status(500).json({ name, error, stack });
    next(err);
  });
};
