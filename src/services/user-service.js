import ValidationError from '../errors/validation-error';

const dataToReturn = ['id', 'name', 'email'];

export default (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select(dataToReturn);

  const create = async (user) => {
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email) throw new ValidationError('Email é um atributo obrigatório');
    if (!user.passwd) throw new ValidationError('Senha é um atributo obrigatório');

    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) throw new ValidationError('Já existe um usuário com esse email');

    const result = await app.db('users').insert(user, dataToReturn);
    return result;
  };

  return { findAll, create };
};
