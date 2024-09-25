export interface Players {
  id: number;
  fifa_version: string;
  fifa_update: string;
  player_face_url: string;
  long_name: string;
  player_positions: string;
  overall: number;
  potential: number;
  age: number;
  club_name?: string;
  nationality_name?: string;
  value_eur?: number;
  wage_eur?: number;
  height_cm?: number;
  weight_kg?: number;
  preferred_foot?: string;
  weak_foot?: number;
  skill_moves?: number;
  international_reputation?: number;
  work_rate?: string;
  body_type?: string;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physic?: number;
  attacking_crossing?: number;
  attacking_finishing?: number;
  attacking_heading_accuracy?: number;
  attacking_short_passing?: number;
  attacking_volleys?: number;
  skill_dribbling?: number;
  skill_curve?: number;
  skill_fk_accuracy?: number;
  skill_long_passing?: number;
  skill_ball_control?: number;
  movement_acceleration?: number;
  movement_sprint_speed?: number;
  movement_agility?: number;
  movement_reactions?: number;
  movement_balance?: number;
  power_shot_power?: number;
  power_jumping?: number;
  power_stamina?: number;
  power_strength?: number;
  power_long_shots?: number;
  mentality_aggression?: number;
  mentality_interceptions?: number;
  mentality_positioning?: number;
  mentality_vision?: number;
  mentality_penalties?: number;
  mentality_composure?: number;
  defending_marking?: number;
  defending_standing_tackle?: number;
  defending_sliding_tackle?: number;
  goalkeeping_diving?: number;
  goalkeeping_handling?: number;
  goalkeeping_kicking?: number;
  goalkeeping_positioning?: number;
  goalkeeping_reflexes?: number;
  goalkeeping_speed?: number;
  player_traits?: string;
}

interface PlayerModification extends Partial<Players> {
  id: number;
  fifa_version: string;
  fifa_update: string;
  player_face_url: string;
  long_name: string;
  player_positions: string;
  overall: number;
  potential: number;
  age: number;
}
/**
 * Los casos de varios campos de Player interface podrían ser usados como ENUM,
 * por ejemplo:
 * - player_position
 * - prefer_foot: Left, Right
 * - international reputation: 1, 2, 3
 * - body_type: Normal, Lean, Stocky + (num-num)
 * - work_rate: con las combinaciones de a dos, entre Low, Medium, High
 **/
export enum FieldToFilterSearch {
  'fifa_version',
  'long_name',
  'player_positions',
  'club_name',
  'nationality_name',
  'overall',
  'potential',
  'age',
  'player traits',
}
