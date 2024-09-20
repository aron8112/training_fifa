const fs = require('fs');
const path = require('path');
const busboy = require('busboy');
const csv = require('csv-parser');
const dirSave = require('../public/index');
const { csvOptServices } = require('../services');

const exportCSVwithFS = async (req, res) => {
  try {
    let sendCSV = await csvOptServices.downloadWithFS();
    res.status(200).sendFile(sendCSV);
    fs.unlinkSync(sendCSV);
  } catch (error) {
    res.status(400).json({
      status: error.status,
      error: error.message,
    });
    return;
  }
};

const exportCSVwithXLSX = async (req, res) => {
  try {
    let sendCSV = await csvOptServices.downloadWithXsls();
    res.statusCode = 200;
    res.setHeader('Content-Disposition', 'attachment; filename="fifa_players2024.csv"');
    res.setHeader('Content-Type', 'application/csv');
    res.end(sendCSV);
  } catch (error) {
    res.status(400).json({
      status: error.status,
      error: error.message,
    });
    // console.error(error);
    return;
  }
};

const uploadCSV = async (req, res) => {
  const bb = busboy({ headers: req.headers });
  let tableName = '';

  // Cuando se recibe un archivo
  bb.on('file', (fieldname, file, filename) => {
    tableName = filename.filename.slice(0, -4); // Obtener el nombre del archivo sin extensión
    const saveTo = path.join(dirSave, filename.filename);

    // Guardar el archivo en la carpeta "uploads"
    file.pipe(fs.createWriteStream(saveTo));

    // Procesar el archivo CSV una vez que se haya subido
    file.on('end', async () => {
      console.log('Archivo CSV recibido:', filename);

      // Leer y procesar el archivo CSV
      const results = [];
      fs.createReadStream(saveTo)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          //Eliminar archivo
          fs.unlinkSync(saveTo);

          //Crear tabla
          let createTable = await csvOptServices.uploadCSV(results, tableName);
          if (createTable) {
            res.status(200).json({
              status: 'Datos creados',
              parsedInfo: results,
            });
          }
        });
    });
  });

  // Cuando finaliza la subida de archivos
  bb.on('finish', () => {
    console.log('Subida completada');
  });

  // Manejo de errores
  bb.on('error', (err) => {
    res.status(500).json({ message: 'Error en la subida del archivo', error: err });
  });

  req.pipe(bb); // Pasar la request a Busboy
};

module.exports = { uploadCSV, exportCSVwithFS, exportCSVwithXLSX };
