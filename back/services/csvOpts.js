var XLSX = require('xlsx');
const { playerProvider } = require('../providers');
const { writeFile } = require('fs').promises;
let dirSave = require('../public');
let converter = require('json-2-csv');
const csv = require('csv-parser'); // Librería para leer CSV
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const fs = require('fs');

const downloadWithFS = async () => {
  //OPCION CON FS Y JSON-2-CSV

  let data = await playerProvider.raw_data();

  const csv = await converter.json2csv(data);

  let fileName = `fifaPlayers_${Date.now()}.csv`;

  await writeFile(`${dirSave}/${fileName}`, csv, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file not saved or corrupted file saved.');
    } else {
      console.log('ok');
    }
  });

  let completePathToExportFile = `${dirSave}/${fileName}`;

  return completePathToExportFile;
};

const downloadWithXsls = async () => {
  // Getting and formatting data
  let data = await playerProvider.raw_data();

  let headersXlsx = Object.keys(data);
  let rows = Object.values(data);
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    headers: headersXlsx,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'fifa_players');

  const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'csv' });

  return buf;
};

const uploadCSV = async (file, tableName) => {
  const sampleData = file[0];

  // Crear el modelo dinámico de la tabla
  const fields = {};
  Object.keys(sampleData).forEach((key) => {
    fields[key] = { type: DataTypes.STRING }; // Asumimos que todos los campos son strings, puedes ajustar según sea necesario
  });

  const DynamicModel = await sequelize.define(tableName, fields, {
    timestamps: false,
  });

  try {
    // console.log(fields);
    // return true;
    // // Crear la tabla si no existe
    await DynamicModel.sync({ force: true }).then(
      async () => await DynamicModel.bulkCreate(fields)
    );
    return true;
  } catch (error) {
    // throw new Error('Error al crear la tabla o insertar los datos', error);
    console.error(error);
  }
};

module.exports = {
  downloadWithFS,
  downloadWithXsls,
  uploadCSV,
};
