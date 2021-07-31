const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const db = sequelize.db;
const Channel = db.channel;
const Text = db.text;

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



const textService = {
    persistTextChat : persistTextChat
};

module.exports = textService;