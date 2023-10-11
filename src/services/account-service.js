export default (app) => {
  const findAll = (filter = {}) => app.db('accounts').where(filter).select();

  const create = async (account) => {
    const result = await app.db('accounts').insert(account, '*');
    return result;
  };

  const update = async (id, account) => {
    const result = await app.db('accounts')
      .where('id', '=', id)
      .update(account, '*');
    return result;
  };

  const remove = async (id) => {
    const result = await app.db('accounts')
      .where({ id })
      .del();
    return result;
  };

  return {
    findAll, create, update, remove,
  };
};
