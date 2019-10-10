const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Session = sequelize.define('session', {
    sid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    sess: {
        type: Sequelize.JSON,
        allowNull: false
    },
    expire: {
        type: Sequelize.DATE,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports = Session;



