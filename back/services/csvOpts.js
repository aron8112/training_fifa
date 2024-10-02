var XLSX = require('xlsx');
const { playerProvider } = require('../providers');
const { writeFile } = require('fs').promises;
let dirSave = require('../public');
let converter = require('json-2-csv');
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const downloadWithFS = async () => {
  //OPCION CON FS Y JSON-2-CSV

  let data = await playerProvider.raw_data();

  const csv = await converter.json2csv(data);

  let fileName = `fifaPlayers_fs2024.csv`;

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
  // console.log(file);
  console.log(tableName);
  const sampleData = file[0];

  // Create a model to create a new table
  const fields = {};
  Object.keys(sampleData).forEach((key) => {
    /**
     * For now, all fields will be strings
     * @todo:
     * modify the function to a new version where it will check the type
     * and pass it as different DataTypes
     *
     */
    // if (fields[key] === 'player_id') {
    //   fields[key] = {
    //     primaryKey: true,
    //     type: DataTypes.INTEGER,
    //     unique: true,
    //     autoincrement: true,
    //   };
    // }
    fields[key] = { type: DataTypes.STRING };
  });

  const DynamicModel = await sequelize.define(tableName, fields, {
    timestamps: false,
  });

  try {
    console.log('sampleData', sampleData);

    // Create table if not exists
    await DynamicModel.sync({ force: true });
    await DynamicModel.bulkCreate(file);
    // file.map((player) => console.log(Object.entries(player)));
    // let update = await DynamicModel.bulkCreate([
    //   {
    //     player_id: '227125',
    //     player_url: '/player/227125/sam-kerr/230009',
    //     fifa_version: '23',
    //     fifa_update: '9',
    //     fifa_update_date: '2023-01-13',
    //     short_name: 'S. Kerr',
    //     long_name: 'Samantha May Kerr',
    //     player_positions: 'ST',
    //     overall: '91',
    //     potential: '91',
    //     value_eur: '134500000',
    //     wage_eur: '4000',
    //     age: '28',
    //     dob: '1993-09-10',
    //     height_cm: '168',
    //     weight_kg: '66',
    //     league_id: '2216',
    //     league_name: "Women's Super League",
    //     league_level: '1',
    //     club_team_id: '116010',
    //     club_name: 'Chelsea W',
    //     club_position: 'ST',
    //     club_jersey_number: '20',
    //     club_loaned_from: '',
    //     club_joined_date: '2020-01-01',
    //     club_contract_valid_until_year: '2024',
    //     nationality_id: '195',
    //     nationality_name: 'Australia',
    //     nation_team_id: '',
    //     nation_position: '',
    //     nation_jersey_number: '',
    //     preferred_foot: 'Right',
    //     weak_foot: '4',
    //     skill_moves: '4',
    //     international_reputation: '5',
    //     work_rate: 'High/High',
    //     body_type: 'Normal (170-)',
    //     real_face: 'Yes',
    //     release_clause_eur: '275700000',
    //     player_tags:
    //       '#Aerial Threat,#Dribbler,#Engine,#Distance Shooter,#Acrobat,#Clinical Finisher,#Complete Forward',
    //     player_traits:
    //       'Solid Player,Leadership,Finesse Shot,Speed Dribbler (AI),Power Header,Chip Shot (AI)',
    //     pace: '87',
    //     shooting: '91',
    //     passing: '74',
    //     dribbling: '90',
    //     defending: '42',
    //     physic: '83',
    //     player_face_url: 'https://cdn.sofifa.net/players/227/125/23_120.png',
    //   },
    // ]);
    // console.log(update);

    return true;
  } catch (error) {
    throw new Error('Error al crear la tabla o insertar los datos', error);
    // console.error(error);
  }
};

module.exports = {
  downloadWithFS,
  downloadWithXsls,
  uploadCSV,
};
