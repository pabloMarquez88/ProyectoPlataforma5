module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users_chat", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    });

    return User;
};