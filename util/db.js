const Sequelize = require('sequelize');

const sequelize = new Sequelize('task', 'task', 'task', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;
