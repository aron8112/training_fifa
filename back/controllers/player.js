const playerServices = require('../services');

const getPlayers = (req, res) => {
  try {
    const allPlayers = playerServices.player;
    res.status(200).json(allPlayers);
  } catch (error) {
    throw new Error('Some error to fix');
  }
};

const getMetaData = (req, res) => {
  try {
    const allPlayers = playerServices.getMetaData;
    res.status(200).json(allPlayers);
  } catch (error) {
    throw new Error('Some error to fix');
  }
};

module.exports = { getPlayers };
