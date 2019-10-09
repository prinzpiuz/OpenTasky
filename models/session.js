const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Session = sequelize.define('session', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    project: Sequelize.STRING
});

module.exports = Session;

//type
//0=internal
//1=external
//2=proof of concept