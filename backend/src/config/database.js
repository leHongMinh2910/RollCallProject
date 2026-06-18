const { Sequelize } = require('sequelize');
const { dbStorage } = require('./env');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStorage,
  logging: false
});

module.exports = sequelize;
