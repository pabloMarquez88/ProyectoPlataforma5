const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const db = sequelize.db;
const Channel = db.channel;
const Media = db.media;
const User = db.UserChat;

persistMediaChat = async(channelId, base64Image, filename, userId, type) =>{
    console.log("saving media chat")
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
    let media = await Media.create({
        data: base64Image,
        name: filename,
        type: type,
        date: Date.now(),
        username: user.username
    });
    media.setChannel(channel);
    await media.save();
    channel.addSuscriptions(user);
    await channel.save();
    return getResponse(200, "chat media saved");
}

getMediaChat = async(mediaId) => {
    console.log("get media chat")
    let media = await Media.findOne({
        where: {
            id: mediaId
        }
    })
    return getResponse(200, media);
}


const mediaService = {
    persistMediaChat : persistMediaChat,
    getMediaChat:getMediaChat
};

module.exports = mediaService;