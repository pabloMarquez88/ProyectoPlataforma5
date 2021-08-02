const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const db = sequelize.db;
const Channel = db.channel;
const Text = db.text;
const User = db.UserChat;

persistTextChat = async(channelId, userId, textMessage) => {
    console.log("saving text chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let user = await User.findOne({
        where: {
            id: userId
        }
    })
    let text = await Text.create({
        content:textMessage,
        date:Date.now(),
        username:user.username
    });
    text.setChannel(channel);
    await text.save();
    channel.addSuscriptions(user);
    await channel.save();
    return getResponse(200, "chat saved");
}

getTextChat = async(textId) => {
    console.log("get text chat")
    let text = await Text.findOne({
        where: {
            id: textId
        }
    })
    return getResponse(200, text);
}


const textService = {
    persistTextChat : persistTextChat,
    getTextChat:getTextChat
};

module.exports = textService;