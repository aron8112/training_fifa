const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

// Create token with user data
const tokenSign = (user) =>
  jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    SECRET,
    {
      expiresIn: '24h',
    }
  );

module.exports = {
  tokenSign,
};
