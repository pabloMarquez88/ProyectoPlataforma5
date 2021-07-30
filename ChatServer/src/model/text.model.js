const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Text = sequelize.define("texts", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Text;
};