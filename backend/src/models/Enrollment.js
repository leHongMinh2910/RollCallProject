const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
});

module.exports = Enrollment;
