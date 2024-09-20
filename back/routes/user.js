const express = require('express');
const app = express();
const { userController } = require('../controllers');
const { authenticateUser, authorizeUser } = require('../middlewares/authentication');

/** GET USER CREDENTIALS **/
/**
 * @params name, email, password, role = default user
 * @returns token
 */
app.post('/auth/login', userController.login);
/**
 * @params name, email, password, role = default user
 * @returns token
 */
app.post('/auth/signup', userController.signup);
app.get('/:id', authenticateUser, authorizeUser(['user', 'admin']), userController.showProfile);

app.put(
  '/:id/modify',
  authenticateUser,
  authorizeUser(['user', 'admin']),
  userController.updateData
);
app.delete(
  '/:id/delete',
  authenticateUser,
  authorizeUser(['user', 'admin']),
  userController.deleteAccount
);

module.exports = app;
