export default (app) => {
  const findAll = () => app.db('users').select();

  const create = async (user) => {
    console.log(user);
    const result = await app.db('users').insert(user, '*');
    return result[0];
  };

  return { findAll, create };
};
