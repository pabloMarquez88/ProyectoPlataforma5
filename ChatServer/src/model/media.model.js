const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
        data: {
            type: DataTypes.BLOB("long")
        },
        name:{
            type: DataTypes.STRING,
        },
        type:{
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE
        },
        username: {
            type: Sequelize.STRING
        }
    });

    return Media;
};