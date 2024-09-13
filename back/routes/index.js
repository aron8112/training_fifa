const express = require('express');
const app = express();
const players = require('./player');

app.use('/players', players);

module.exports = app;
