const { playerProvider } = require('../providers');
const { checkAllowedFields } = require('../utils/filters');
const { regexForQueryParamsPag, randomColor } = require('../utils/regex');

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
  limit = 12;
  offset = parseInt(limit) * (parseInt(queryparams) - 1);
  console.log(offset);

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
  console.log('Updating more than 1 field: ', Object.entries(newData));
  if (lookForThePlayer) {
    if ((Object.keys(newData).length = 1)) {
      console.log(`controller update: ${typeof newData}`);
      let updatedPlayer = await playerProvider.updateOneFieldPlayer(newData, idInt);
      return updatedPlayer;
    } else {
      let updated = [];
      if (lookForThePlayer) {
        Object.entries(newData).forEach(async ([key, value]) => {
          console.log({ [key]: value });
          updated.push(await playerProvider.updatePlayer(key, value, idInt));
        });
        return updated;
      }
    }
  } else {
    throw new Error('Player not found!');
  }
};

const deleteOne = async (id) => {
  let deleted = await playerProvider.deletePlayer(id);
  if (deleted) return true;
};

const allData = async () => {
  return await playerProvider.raw_data();
};

const lookForVersions = async (name) => {
  let playerVersions = await playerProvider.getDifferentVersions(name);

  const dataFromBD = playerVersions.map((row) => {
    const color = randomColor();

    return {
      label: `Versión FIFA: ${row.fifa_version}`,
      data: [row.pace, row.shooting, row.passing, row.dribbling, row.defending, row.physic],
      fill: true,
      backgroundColor: `rgba(${color}, 0.2)`,
      borderColor: `rgb(${color})`,
      pointBackgroundColor: `rgb(${color})`,
      pointBorderColor: `#fff`,
      pointHoverBackgroundColor: `#fff`,
      pointHoverBorderColor: `rgb(${color})`,
    };
  });

  let objectForChart = {
    labels: ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physic'],
    datasets: dataFromBD,
  };

  return objectForChart;
};

const getDetailedSkills = async (name) => {
  let labels = [
    'fifa_version',
    'attacking_crossing',
    'attacking_finishing',
    'attacking_heading_accuracy',
    'attacking_short_passing',
    'attacking_volleys',
    'skill_dribbling',
    'skill_curve',
    'skill_fk_accuracy',
    'skill_long_passing',
    'skill_ball_control',
    'movement_acceleration',
    'movement_sprint_speed',
    'movement_agility',
    'movement_reactions',
    'movement_balance',
    'power_shot_power',
    'power_jumping',
    'power_stamina',
    'power_strength',
    'power_long_shots',
    'mentality_aggression',
    'mentality_interceptions',
    'mentality_positioning',
    'mentality_vision',
    'mentality_penalties',
    'mentality_composure',
    'defending_marking',
    'defending_standing_tackle',
    'defending_sliding_tackle',
    'goalkeeping_diving',
    'goalkeeping_handling',
    'goalkeeping_kicking',
    'goalkeeping_positioning',
    'goalkeeping_reflexes',
    'goalkeeping_speed',
  ];
  let skills = await playerProvider.playerDetailedSkills(name, labels);

  const dataFromBD = skills.map((row) => {
    const color = randomColor();

    return {
      label: row.fifa_version,
      data: [
        row.attacking_crossing,
        row.attacking_finishing,
        row.attacking_heading_accuracy,
        row.attacking_short_passing,
        row.attacking_volleys,
        row.skill_dribbling,
        row.skill_curve,
        row.skill_fk_accuracy,
        row.skill_long_passing,
        row.skill_ball_control,
        row.movement_acceleration,
        row.movement_sprint_speed,
        row.movement_agility,
        row.movement_reactions,
        row.movement_balance,
        row.power_shot_power,
        row.power_jumping,
        row.power_stamina,
        row.power_strength,
        row.power_long_shots,
        row.mentality_aggression,
        row.mentality_interceptions,
        row.mentality_positioning,
        row.mentality_vision,
        row.mentality_penalties,
        row.mentality_composure,
        row.defending_marking,
        row.defending_standing_tackle,
        row.defending_sliding_tackle,
        row.goalkeeping_diving,
        row.goalkeeping_handling,
        row.goalkeeping_kicking,
        row.goalkeeping_positioning,
        row.goalkeeping_reflexes,
        row.goalkeeping_speed,
      ],
      fill: false,
      borderColor: `rgb(${color})`,
      tension: 0.1,
    };
  });
  let objectForChart = {
    labels: labels,
    datasets: dataFromBD,
  };
  return objectForChart;
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
  allData,
  lookForVersions,
  getDetailedSkills,
};
