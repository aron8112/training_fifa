const { Sequelize, DataTypes, Model } = require('sequelize');
const { connect, sequelize } = require('../config/db');

const UserModel = sequelize.define(
  'UserModel',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoincrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    modelName: 'UserModel',
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = UserModel;
