import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import ValidationError from '../errors/validation-error';

function generateToken(payload) {
  const privateKey = fs.readFileSync(path.resolve('./ssh-keys/id_rsa'));

  const token = jwt.sign(
    payload,
    privateKey,
    { expiresIn: '1h', algorithm: 'RS512' },
  );

  return token;
}

export default (app) => {
  const signin = async (req, res, next) => {
    const { email, passwd } = req.body;
    app.services.user.findOneByEmailWithPasswd(email)
      .then(async (userDB) => {
        if (!bcrypt.compareSync(passwd, userDB.passwd)) {
          throw new ValidationError('Login failed!');
        }
        const payload = {
          id: userDB.id,
          name: userDB.name,
          email: userDB.email,
        };
        const token = generateToken(payload);
        res.status(200).json({ token });
      })
      .catch((error) => next(error));
  };

  return { signin };
};
