const UserModel = require('../models/user');

const login = async (email) => {
  return await UserModel.findOne({ where: { email: email } });
};

module.exports = {
  login,
};
