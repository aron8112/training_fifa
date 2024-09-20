const express = require('express');
const app = express();
const { csvOptController } = require('../controllers');

app.get('/download', csvOptController.exportCSVwithXLSX);
app.get('/download2', csvOptController.exportCSVwithFS);

app.post('/upload', csvOptController.uploadCSV);

module.exports = app;
