module.exports = (sequelize, Sequelize) => {
    const UserChat = sequelize.define("userchats", {
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

    return UserChat;
};