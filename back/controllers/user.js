const { userServices } = require('../services');

const login = async (req, res) => {
  try {
    let loggedUser = await userServices.login(req.body);
    res.status(200).json({
      status: 'OK',
      token: loggedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

module.exports = { login };
