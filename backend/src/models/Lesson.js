const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lessonDate: { type: DataTypes.DATEONLY, allowNull: false },
  isOpen: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Lesson;
