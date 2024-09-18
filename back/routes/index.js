const express = require('express');
const app = express();
const players = require('./player');
const auth = require('./auth');
const csvOpt = require('./csvOpts');

//CRUD for Players
app.use('/players', players);

//USERS LOGIN
app.use('/auth', auth);

//CSV process
app.use('/docs', csvOpt);

module.exports = app;
