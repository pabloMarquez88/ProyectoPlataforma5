module.exports = (sequelize, Sequelize) => {
    const Text = sequelize.define("texts", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
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