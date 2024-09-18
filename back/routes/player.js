const express = require('express');
const app = express();
const { playerController } = require('../controllers');
const { checkPlayerInput, checkPlayerIdParamSent } = require('../middlewares/validators');
const isLoggedIn = require('../middlewares/authentication');

//Show all players with pagination
app.get('/', playerController.pagination);

/**
 * @query_search
 * @param1 filter -> search by column
 * @param2 search -> data
 * @param3 exact -> is the search exact (true) or similar (false), default value false
 * @param4 offset -> n1-n2, representing n1 (limit) and n2 (offset), default value 10-1
 **/
app.get('/search', playerController.findOneOrMore);

//Player by id
app.get('/:id', isLoggedIn, checkPlayerIdParamSent, playerController.findOneById);
app.put('/:id', isLoggedIn, checkPlayerIdParamSent, checkPlayerInput, playerController.updateById);
app.delete('/:id', isLoggedIn, checkPlayerIdParamSent, playerController.deleteById);

//Create player
app.post('/create', isLoggedIn, checkPlayerInput, playerController.newPlayer);

//Wildcard
// app.all('*', (req, res) => res.send(new CustomError('Page Not Found')));

module.exports = app;
