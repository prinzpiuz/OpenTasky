const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = User;

//status
//0=not yet completed signup
//1=completed

//role
//0=user
//1=admin
