const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        options: {
            type: Sequelize.STRING
        },
        openOptions: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Event;
};