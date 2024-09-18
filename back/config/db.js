const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  operatorsAliases: '0',
  timezone: '-03:00',
  dialectOptions: {
    timezone: '-03:00',
    dateStrings: true,
    typeCast: true,
  },
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSW,
  // sequelizeOptions
  { host: process.env.DB_HOST, dialect: 'mysql' }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con la Base de Datos: EXITOSA');
  } catch (error) {
    console.error('Conexión con la Base de Datos: FALLIDA');
    console.error(error);
  }
};

module.exports = { connect, sequelize };
