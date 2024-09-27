const { Sequelize, DataTypes, Model } = require('sequelize');
const { connect, sequelize } = require('../config/db');

const UserModel = sequelize.define(
  'UserModel',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'editor', 'user'),
      defaultValue: 'user',
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
