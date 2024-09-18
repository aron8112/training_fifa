const bcrypt = require('bcrypt');
const HASH = process.env.HASH;
require('dotenv').config();

let encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

let decryptPassword = async (passw, hashedPassw) => {
  return await bcrypt.compare(passw, hashedPassw);
};

module.exports = { encryptPassword, decryptPassword };
