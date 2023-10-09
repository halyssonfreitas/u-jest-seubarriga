export default (app) => {
  const findAll = () => app.db('users').select();

  const create = async (user) => {
    if (!user.name) return { error: 'Nome é um atibuto obrigatório' };
    const result = await app.db('users').insert(user, '*');
    return result[0];
  };

  return { findAll, create };
};
