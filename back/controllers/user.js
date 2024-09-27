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

const signup = async (req, res) => {
  console.log(req.body);
  try {
    let createUser = await userServices.signIn(req.body);
    res.status(201).json({
      status: 'OK',
      token: createUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

const showProfile = async (req, res) => {
  let { id } = req.params;
  try {
    let findUser = await userServices.findById(id);
    res.status(201).json({
      status: 'OK',
      token: findUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

const updateData = async (req, res) => {
  let id = req.params;
  let data = req.body;
  try {
    await userServices.updateUser(id, data);
    res.status(200).json({
      status: 'OK',
      message: 'User was ',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  let { id } = req.params;
  try {
    await userServices.delUser(id);
    res.status(200).json({
      status: 'OK',
      message: 'User was ',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

module.exports = { login, signup, updateData, deleteAccount, showProfile };
