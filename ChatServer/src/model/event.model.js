const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        content: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        dateStart: {
            type: DataTypes.DATE
        },
        dateEnd: {
            type: DataTypes.DATE
        },
        date: {
            type: DataTypes.DATE
        },
        username: {
            type: Sequelize.STRING
        }
    });

    return Event;
};