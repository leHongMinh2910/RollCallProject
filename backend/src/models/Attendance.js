const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late', 'excused', 'pending'),
    allowNull: false,
    defaultValue: 'pending'
  }
});

module.exports = Attendance;
