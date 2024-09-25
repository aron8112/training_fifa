const { playerServices } = require('../services');
const { checkAllowedFields } = require('../utils');

const getPlayers = async (req, res) => {
  try {
    let filterArray = req.query;
    // const allPlayers = await player.player();
    res.status(200).send(Array.from(filterArray));
  } catch (error) {
    throw new Error('Some error to fix');
  }
};

const getMetaData = (req, res) => {
  try {
    const metadataTable = playerServices.getMetaData();
    res.status(200).json(metadataTable);
  } catch (error) {
    res.status(400).json(error);
    // throw new Error('Some error to fix');
  }
};

const askFor3Players = async (req, res) => {
  try {
    const threePlayers = await player.get3Players();
    res.status(200).json(threePlayers);
  } catch (error) {
    // res.status(400).json(error);
    console.error(error);
  }
};

const pagination = async (req, res) => {
  let { page } = req.query;
  if (!page) page = 1;
  try {
    const players = await playerServices.pagination(page);
    res.status(200).json(players);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findOneOrMore = async (req, res) => {
  console.log(req.query);
  let { filter, search, exact, page } = req.query;
  // If not declared search will be similar by default
  if (!exact) exact = false;
  if (!page) page = 1;
  if (!checkAllowedFields(filter)) throw new CustomError('Forbidden', 403);
  try {
    const onePlayer = await playerServices.findOneOrMorePlayers(filter, search, exact, page);
    res.status(200).json(onePlayer);
  } catch (error) {
    res.status(400).json({
      status: error.status,
      error: error.message,
    });
    return;
  }
};

const findOneById = async (req, res) => {
  let { id } = req.params;
  try {
    const onePlayer = await playerServices.findPlayerById(id);
    res.status(200).json(onePlayer);
  } catch (error) {
    res.status(400).json({
      status: error.status,
      error: error.message,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const onePlayer = await playerServices.updateOne(req.body.newPlayer, req.params.id);
    if (onePlayer) {
      res.status(200).json({ status: 'Ok', message: 'Player updated' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
    return;
  }
};

const deleteById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    // res.send(`delete by id: ${id} ${typeof id}`);
    const onePlayer = await playerServices.deleteOne(id);
    if (onePlayer) {
      res.status(200).json({ status: 'Ok', message: 'Player deleted' });
    }
  } catch (error) {
    // console.error(error);
    res.status(400).json(error);
    return;
  }
};

const newPlayer = async (req, res) => {
  try {
    const createNewPlayer = await playerServices.createOne(req.body.newPlayer);
    res
      .status(201)
      .json({ status: 'Created', message: `New player ${createNewPlayer.long_name} was created` });
  } catch (error) {
    res.status(400).json({
      status: error.statusCode,
      error: error.message,
    });
  }
};

module.exports = {
  getPlayers,
  getMetaData,
  askFor3Players,
  pagination,
  findOneOrMore,
  findOneById,
  updateById,
  deleteById,
  newPlayer,
};
