const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

const player = async () => {
  await sequelize.query('SELECT * FROM `players` WHERE nationality_name="Argentina" LIMIT 3;', {
    raw: true,
    type: QueryTypes.SELECT,
  });
};

const getMetadataFromTable = async () => {
  const [results, metadata] = await sequelize.query('SELECT * FROM `players`LIMIT 3;');
  return metadata;
};

module.exports = { player, getMetadataFromTable };
