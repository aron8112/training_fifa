const express = require('express');
const app = express();
const players = require('./player');
const user = require('./user');
const csvOpt = require('./csvOpts');

//CRUD for Players
app.use('/players', players);

//USERS LOGIN
app.use('/user', user);

//CSV process
app.use('/docs', csvOpt);

module.exports = app;
