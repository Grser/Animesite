const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('anime_site', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
