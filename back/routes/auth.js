const express = require('express');
const app = express();
const { userController } = require('../controllers');
const { checkUserLogIn } = require('../middlewares/validators');

app.post('/login', checkUserLogIn, userController.login);

module.exports = app;
