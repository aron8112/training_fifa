const UserModel = require('../models/user');
const { encryptPassword, decryptPassword } = require('../auth/encryption');

const login = async (email) => {
  return await UserModel.findOne({ where: { email: email } });
};

const createNew = async (data) => {
  let { name, email, password } = data;
  return await UserModel.create({
    name,
    email,
    password: await encryptPassword(password),
  });
};

module.exports = {
  login,
  createNew,
};
