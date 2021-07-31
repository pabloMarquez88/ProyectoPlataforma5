const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Text = db.text;
const Event = db.event;

persistTextChat = async(channelId, textMessage) => {
    console.log("saving text chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let text = await Text.create({
        content:textMessage,
        date:Date.now()
    });
    text.setChannel(channel);
    await text.save();
    return getResponse(200, "chat saved");
}

persistMediaChat = async(channelId) =>{
    console.log("saving media chat")
    let channel = await Channel.findOne({where: {id: channelId}});

}



const chatService = {
    persistTextChat : persistTextChat,
    persistMediaChat : persistMediaChat
};

module.exports = chatService;