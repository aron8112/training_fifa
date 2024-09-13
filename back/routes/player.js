const express = require('express');
const { playerController } = require('../controllers');
const app = express();

app.get('/1', playerController.getPlayers);
app.get('/metadata', playerController.getPlayers);
module.exports = app;
