const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING.BINARY
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Media;
};