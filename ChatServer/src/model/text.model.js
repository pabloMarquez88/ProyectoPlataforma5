const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Text = sequelize.define("texts", {
        content: {
            type: Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Text;
};