module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define("channels", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Channel;
};