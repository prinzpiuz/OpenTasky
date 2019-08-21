const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
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

module.exports = Project;

//type
//0=internal
//1=external
//2=proof of concept