const { playerProvider } = require('../providers');
const { checkAllowedFields } = require('../utils/filters');
const { regexForQueryParamsPag } = require('../utils/regex');

/**
 * TESTING INIT
 *
 **/
const player = async () => {
  return await playerProvider.playerRaw();
};

const getMetadataFromTable = async () => {
  return await playerProvider.getMetadataFromTable();
};

const get3Players = async () => {
  return await playerProvider.get3Players();
};

const pagination = async (queryparams) => {
  limit = 10;
  offset = parseInt(limit * parseInt(queryparams) - 1);

  const showPlayers = await playerProvider.pagination(limit, offset);
  return showPlayers;
};

//--------------------------------- QUERIES -------------------------------------------------------//
/**
 * @param param1 - Column
 * @param param2 - Data
 * @param param3 - Exact or Similar Search
 * @param param4 - Limit and Offset
 * @returns Futbol players[] limited by offset
 */

const findOneOrMorePlayers = async (param1, param2, param3, param4) => {
  const playersFounded = await playerProvider.findOneOrMorePlayers(param1, param2, param3, param4);
  return playersFounded;
};

const findPlayerById = async (param) => {
  const onePlayer = await playerProvider.findPlayerById(param);
  return onePlayer;
};

const createOne = async (newPlayer) => {
  console.log(`Services: ${Object.entries(newPlayer)}`);
  const createNewPlayer = await playerProvider.createOne(newPlayer);
  return createNewPlayer;
};

const updateOne = async (newData, id) => {
  let idInt = parseInt(id);
  let lookForThePlayer = await findPlayerById(idInt);
  // console.log(`ID to update: ${id} and type is ${typeof idInt} `);
  //Update many fields?
  // console.log('New Data: ', newData, ' type is: ', typeof newData);
  // console.log(Object.entries(newData));
  console.log('Updating more than 1 field: ', Object.keys(newData).length > 1);
  if (Object.keys(newData).length > 1) {
    let updated = [];
    if (lookForThePlayer) {
      Object.entries(newData).forEach(async ([key, value]) => {
        console.log({ [key]: value });
        updated.push(await playerProvider.updatePlayer(key, value, idInt));
      });
      return updated;
    }
  } else {
    let updatedPlayer = await playerProvider.updatePlayer(newData, idInt);
    return updatedPlayer;
  }
};

const deleteOne = async (id) => {
  let deleted = await playerProvider.deletePlayer(id);
  if (deleted) return true;
};

module.exports = {
  player,
  getMetadataFromTable,
  get3Players,
  pagination,
  findOneOrMorePlayers,
  findPlayerById,
  createOne,
  updateOne,
  deleteOne,
};
