export default (app) => {
  const findAll = (filter = {}) => app.db('accounts').where(filter).select();

  const create = async (account) => {
    const result = await app.db('accounts').insert(account, '*');
    return result[0];
  };

  return { findAll, create };
};
