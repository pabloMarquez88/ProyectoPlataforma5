const sequelize = require('../model/sequelize.facade');
const db = sequelize.db;
const Op = db.Sequelize.Op;
const User = db.UserChat;
const Channel = db.channel;
const Text = db.text;

persistTextChat = async(channelId, textMessage, exist) => {
    console.log("TEST")
    let channel = await Channel.findOne({where: {id: channelId}});

    let text = await Text.create({content:textMessage,date:Date.now()});

    text.setChannel(channel);
    await text.save();
    return getResponse(200, "chat saved");
}

function getResponse(status, message){
    return {result:status, message:message}
}

const chatService = {
    /*checkRolesExisted: checkRoleValid,
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    createUser : createUser,*/
    persistTextChat : persistTextChat
};

module.exports = chatService;