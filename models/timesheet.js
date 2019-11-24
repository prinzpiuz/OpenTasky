const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const TimeSheet = sequelize.define('timesheet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task_name: Sequelize.STRING,
    task_id: Sequelize.INTEGER,
    project_name: Sequelize.STRING,
    remarks: Sequelize.STRING,
    date: Sequelize.DATE,
    total_time_taken: Sequelize.FLOAT,
    userId: Sequelize.INTEGER
});

module.exports = TimeSheet;