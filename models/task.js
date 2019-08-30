const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Task = sequelize.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    start_date: Sequelize.DATE,
    completed_date: Sequelize.DATE,
    userName: Sequelize.STRING,
    userID: Sequelize.INTEGER,
    task: Sequelize.STRING,
    reference: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Task;

//status
//0=not started
//1=started
//2=completed