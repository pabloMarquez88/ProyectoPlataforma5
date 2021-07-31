const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
        content: {
            type: Sequelize.STRING.BINARY
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Media;
};