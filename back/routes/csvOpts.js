const express = require('express');
const app = express();
const { csvOptController } = require('../controllers');

/**
 * @returns: csv file from Fifa players using xlsx package
 */
app.get('/download', csvOptController.exportCSVwithXLSX);

/**
 * @returns: csv file from Fifa players using fs and json-2-csv package
 */
app.get('/download2', csvOptController.exportCSVwithFS);

/**
 * @requires: file
 * @returns:
 * new table in database:
 * 1) will receive the file using busboy
 * 2) with fs.createWriteStream will create a file (located temporary in /public).
 * 3) the new file will be read with the method fs.createReadStream.
 * 4) It will be parsed into a csv file (using csv-parser package), and the results
 *    pushed into an array.
 * 5) Delete the file (fs.unlinkSync).
 * 6) Loop over results with Object.keys to create a new model (table) with sequelize.define,
 *    and create for each key a new field which will only save strings (@todo).
 * 7) Sync the model with the DD.BB.
 * 8) Then create the records (using the same method as it is in seeders -> bulkCreate)
 *
 * Also @todo: validate and sanitize fields values.
 */
app.post('/upload', csvOptController.uploadCSV);

module.exports = app;
