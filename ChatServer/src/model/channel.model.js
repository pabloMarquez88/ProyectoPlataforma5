const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define("channels", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Channel;
};