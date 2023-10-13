import bcrypt from 'bcrypt';
import ValidationError from '../errors/validation-error';

const dataToReturn = ['id', 'name', 'email'];
const saltRounds = 10;

export default (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select(dataToReturn);

  const findOneById = (id) => app.db('users').where({ id }).first(dataToReturn);

  const findOneByIdWithPasswd = (id) => {
    // TODO - Add logic to only permit logged user searcher own data
    return app.db('users').where({ id }).first('*');
  };

  const findOneByEmail = (email) => app.db('users').where({ email }).first();

  const create = async (user) => {
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email) throw new ValidationError('Email é um atributo obrigatório');
    if (!user.passwd) throw new ValidationError('Senha é um atributo obrigatório');

    if (await findOneByEmail(user.email)) throw new ValidationError('Já existe um usuário com esse email');

    const passwd = bcrypt.hashSync(user.passwd, saltRounds, (err, hash) => {
      if (err) throw new ValidationError(err);
      return hash;
    });

    const result = await app.db('users').insert({ ...user, passwd }, dataToReturn);
    return result;
  };

  return {
    findAll, findOneById, findOneByIdWithPasswd, findOneByEmail, create,
  };
};
