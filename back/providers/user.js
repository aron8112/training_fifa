const UserModel = require('../models/user');

const login = async (email) => {
  return await UserModel.findOne({ where: { email: email } });
};

const createNew = async (data) => {
  return await UserModel.create(data);
};

module.exports = {
  login,
  createNew,
};
