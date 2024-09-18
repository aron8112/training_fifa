const express = require('express');
const app = express();
var XLSX = require('xlsx');
const { playerProvider } = require('../providers');
const { writeFile } = require('fs').promises;
let dirSave = require('../public');
let converter = require('json-2-csv');

app.get('/download', async (req, res) => {
  //OPCION CON FS Y JSON-2-CSV
  /**
   * @description
   * toma los datos de la query findAll, con el paquete json-2-csv ajusta los
   * datos al formato requerido (la función JSON.stringify() no).
   * @todo-1
   * mejorar la localización del archivo creado, recurrir a mejores prácticas
   * para identificar la ruta absoluta de la ubicación del archivo.
   * @todo-2
   * separar como corresponde la funcionalidad (controladores, servicios, providers)
   */
  let raw_data = await playerProvider.raw_data();
  let data0 = JSON.stringify(raw_data, null, 2);
  let data = JSON.parse(data0);

  const csv = await converter.json2csv(data);

  let fileName = `fifaPlayers_${Date.now()}.csv`;

  await writeFile(`${dirSave}/${fileName}`, csv, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file not saved or corrupted file saved.');
    } else {
      console.log('ok');
    }
  });

  return res.sendFile(`${dirSave}/${fileName}`);
});

/**
 * OPCION CON xlsx
 * //1. Gather the raw data
 */
app.get('/download2', async (req, res) => {
  try {
    // Getting and formatting data
    let raw_data = await playerProvider.raw_data();
    let data0 = JSON.stringify(raw_data, null, 2);
    let data = JSON.parse(data0);

    let headersXlsx = Object.keys(data);
    let rows = Object.values(data);
    const worksheet = XLSX.utils.json_to_sheet(rows, {
      headers: headersXlsx,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'fifa_players');

    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'csv' });
    res.statusCode = 200;
    res.setHeader('Content-Disposition', 'attachment; filename="fifa_players2024.csv"');
    res.setHeader('Content-Type', 'application/csv');
    res.end(buf);
  } catch (error) {
    res.status(404).json({
      error: error.status,
      message: error.message,
    });
  }
});

module.exports = app;
