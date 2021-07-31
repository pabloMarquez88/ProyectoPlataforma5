const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("polls", {
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