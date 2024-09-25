// FILTERS ALLOWED FOR USER SEARCH

const WHERE_SHORT_QUERY = [
  'fifa_version',
  'player_face_url',
  'long_name',
  'player_positions',
  'club_name',
  'nationality_name',
  'overall',
  'potential',
  'age',
  'player_traits',
];

//CHECK SEARCH COLUMN IS ALLOWED
function checkAllowedFields(column) {
  return WHERE_SHORT_QUERY.includes(column);
}

//VALIDATION FILTERS
const modelDataTypes = [
  // { name: 'id', type: 'number', allowNull: false },
  { name: 'fifa_version', type: 'string', allowNull: false },
  { name: 'fifa_update', type: 'string', allowNull: false },
  { name: 'player_face_url', type: 'string', allowNull: false },
  { name: 'long_name', type: 'string', allowNull: false },
  { name: 'player_positions', type: 'string', allowNull: false },
  { name: 'club_name', type: 'string', defaultValue: null },
  { name: 'nationality_name', type: 'string', defaultValue: null },
  { name: 'overall', type: 'number', allowNull: false },
  { name: 'potential', type: 'number', allowNull: false },
  { name: 'value_eur', type: 'number', defaultValue: null },
  { name: 'wage_eur', type: 'number', defaultValue: null },
  { name: 'age', type: 'number', allowNull: false },
  { name: 'height_cm', type: 'number', defaultValue: null },
  { name: 'weight_kg', type: 'number', defaultValue: null },
  { name: 'preferred_foot', type: 'string', defaultValue: null },
  { name: 'weak_foot', type: 'number', defaultValue: null },
  { name: 'skill_moves', type: 'number', defaultValue: null },
  { name: 'international_reputation', type: 'number', defaultValue: null },
  { name: 'work_rate', type: 'string', defaultValue: null },
  { name: 'body_type', type: 'string', defaultValue: null },
  { name: 'pace', type: 'number', defaultValue: null },
  { name: 'shooting', type: 'number', defaultValue: null },
  { name: 'passing', type: 'number', defaultValue: null },
  { name: 'dribbling', type: 'number', defaultValue: null },
  { name: 'defending', type: 'number', defaultValue: null },
  { name: 'physic', type: 'number', defaultValue: null },
  { name: 'attacking_crossing', type: 'number', defaultValue: null },
  { name: 'attacking_finishing', type: 'number', defaultValue: null },
  { name: 'attacking_heading_accuracy', type: 'number', defaultValue: null },
  { name: 'attacking_short_passing', type: 'number', defaultValue: null },
  { name: 'attacking_volleys', type: 'number', defaultValue: null },
  { name: 'skill_dribbling', type: 'number', defaultValue: null },
  { name: 'skill_curve', type: 'number', defaultValue: null },
  { name: 'skill_fk_accuracy', type: 'number', defaultValue: null },
  { name: 'skill_long_passing', type: 'number', defaultValue: null },
  { name: 'skill_ball_control', type: 'number', defaultValue: null },
  { name: 'movement_acceleration', type: 'number', defaultValue: null },
  { name: 'movement_sprint_speed', type: 'number', defaultValue: null },
  { name: 'movement_agility', type: 'number', defaultValue: null },
  { name: 'movement_reactions', type: 'number', defaultValue: null },
  { name: 'movement_balance', type: 'number', defaultValue: null },
  { name: 'power_shot_power', type: 'number', defaultValue: null },
  { name: 'power_jumping', type: 'number', defaultValue: null },
  { name: 'power_stamina', type: 'number', defaultValue: null },
  { name: 'power_strength', type: 'number', defaultValue: null },
  { name: 'power_long_shots', type: 'number', defaultValue: null },
  { name: 'mentality_aggression', type: 'number', defaultValue: null },
  { name: 'mentality_interceptions', type: 'number', defaultValue: null },
  { name: 'mentality_positioning', type: 'number', defaultValue: null },
  { name: 'mentality_vision', type: 'number', defaultValue: null },
  { name: 'mentality_penalties', type: 'number', defaultValue: null },
  { name: 'mentality_composure', type: 'number', defaultValue: null },
  { name: 'defending_marking', type: 'number', defaultValue: null },
  { name: 'defending_standing_tackle', type: 'number', defaultValue: null },
  { name: 'defending_sliding_tackle', type: 'number', defaultValue: null },
  { name: 'goalkeeping_diving', type: 'number', defaultValue: null },
  { name: 'goalkeeping_handling', type: 'number', defaultValue: null },
  { name: 'goalkeeping_kicking', type: 'number', defaultValue: null },
  { name: 'goalkeeping_positioning', type: 'number', defaultValue: null },
  { name: 'goalkeeping_reflexes', type: 'number', defaultValue: null },
  { name: 'goalkeeping_speed', type: 'number', defaultValue: null },
  { name: 'player_traits', type: 'string', defaultValue: null },
];

module.exports = {
  checkAllowedFields,
  modelDataTypes,
};
