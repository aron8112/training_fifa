const { sequelize } = require('../config/db');
const { QueryTypes, Op } = require('sequelize');
const PlayerModel = require('../models/PlayerModel');
const { CustomError, WHERE_SHORT_QUERY } = require('../utils');

/**
 * TEST QUERIES -- Start proyect
 */

/** Query created to check database connection without a previous model **/
const playerRaw = async () => {
  await sequelize.query('SELECT * FROM `players` WHERE nationality_name="Argentina" LIMIT 3;', {
    raw: true,
    type: QueryTypes.SELECT,
  });
};

/** Query created to check database metadata (NOT TESTED) **/
const getMetadataFromTable = async () => {
  const [results, metadata] = await sequelize.query('SELECT * FROM `players`LIMIT 3;');
  return metadata;
};

/** Query created to test limit and offset **/
const get3Players = async () => {
  const threePlayers = await PlayerModel.findAll({ limit: 3, offset: 1 });
  return threePlayers;
};

//--------------------------------- QUERIES -------------------------------------------------------//

const pagination = async (limit, offset) => {
  const showPlayers = await PlayerModel.findAll({
    offset: parseInt(offset),
    limit: parseInt(limit),
  });
  return showPlayers;
};

/**
 * @param param1 - Column
 * @param param2 - Data
 * @param param3 - Exact or Similar Search
 * @param param4 - Limit and Offset
 * @returns Futbol players[] limited by offset
 */

const findOneOrMorePlayers = async (param1, param2, param3, param4) => {
  const whereCond = {};
  whereCond[param1] = param2;

  // If search is similar
  if (!param3) {
    whereCond[param1] = { [Op.like]: `%${param2.toLowerCase()}%` };
  } else {
    // If we need an exact search
    whereCond[param1] = {
      [Op.eq]: param2,
    };
  }

  //Offset
  let limit = 10;
  let offset = parseInt(param4);

  //Query
  const playersFounded = await PlayerModel.findAll({
    attributes: WHERE_SHORT_QUERY,
    where: whereCond,
    limit: parseInt(limit),
    offset: offset,
  });

  return playersFounded;
};

//Find only one player by id
const findPlayerById = async (param) => {
  const onePlayer = await PlayerModel.findOne({ where: { id: Number(param) } });
  return onePlayer;
};

//Create a new player
const createOne = async (newPlayer) => {
  // console.log('Provider:', newPlayer);

  let newOnePlayer = PlayerModel.build(newPlayer);
  // console.log(typeof newOnePlayer);
  try {
    await newOnePlayer.save();
    return newOnePlayer;
  } catch (error) {
    throw error;
  }
};

const updatePlayer = async (key, value, id) => {
  let newData = { [key]: value };
  let updatedPlayer = await PlayerModel.update(newData, { where: { id: id } });
  return updatedPlayer;
};

const raw_data = async () => {
  let listAll = await PlayerModel.findAll({ limit: 10 });
  return listAll;
};

const countPlayers = async () => {
  let maxNumber = await PlayerModel.count();
  return maxNumber;
};

const deletePlayer = async (id) => {
  let deleted = await PlayerModel.destroy({ where: { id } });
  if (deleted) return true;
};

module.exports = {
  playerRaw,
  getMetadataFromTable,
  get3Players,
  pagination,
  findOneOrMorePlayers,
  findPlayerById,
  createOne,
  updatePlayer,
  raw_data,
  countPlayers,
  deletePlayer,
};
