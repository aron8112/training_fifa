const express = require('express');
const app = express();
const { playerController } = require('../controllers');
const { checkPlayerInput, checkPlayerIdParamSent } = require('../middlewares/validators');
const { authenticateUser, authorizeUser } = require('../middlewares/authentication');

//Show all players with pagination
app.get('/', playerController.pagination);
app.get('/all', playerController.getAll);

/**
 * @query_search
 * @param1 filter -> search by column
 * @param2 search -> data
 * @param3 exact -> is the search exact (true) or similar (false), default value false
 * @param4 offset -> n1-n2, representing n1 (limit) and n2 (offset), default value 10-1
 **/
app.get('/search', authenticateUser, playerController.findOneOrMore);

//Player by id
app.get(
  '/:id',
  authenticateUser,
  // authorizeUser(['admin', 'user', 'editor']),
  checkPlayerIdParamSent,
  playerController.findOneById
);
app.put(
  '/:id',
  authenticateUser,
  authorizeUser(['admin', 'editor']),
  checkPlayerIdParamSent,
  checkPlayerInput,
  playerController.updateById
);
app.delete(
  '/:id',
  authenticateUser,
  authorizeUser(['admin']),
  checkPlayerIdParamSent,
  playerController.deleteById
);

//Create player
app.post('/create', authenticateUser, checkPlayerInput, playerController.newPlayer);

module.exports = app;
