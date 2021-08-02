const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const pollService = require('../services/poll.service.js');
const eventService = require('../services/event.service.js');
const textService = require('../services/text.service.js');
const mediaService = require('../services/media.service.js');
const db = sequelize.db;
const Channel = db.channel;
const User = db.UserChat;

function isPresent(elements, item){
    let flag = false;
    elements.forEach((e, i) =>{
        if (e.id == item.id){
            flag = true;
        }
    });
    return flag;
}

getChatConsolidated = async(userId) => {
    console.log("get Consolidated chat")
    let user = await User.findOne({
        where: {
            id: userId
        }
    });
    let owns = await user.getOwnchats();
    let channels = await user.getSuscriptions();
    owns.forEach((elem, i) =>{
        if (!isPresent(channels, elem)){
            channels.push(elem);
        }
    });
    let channelChats = [];
    for (let index = 0; index < channels.length; index++) {
        let channel = channels[index]
        let chats = [];
        let texts = await channel.getTexts();
        let events = await channel.getEvents();
        let polls = await channel.getPolls();
        let medias = await channel.getMedias();
        for (let j = 0; j < texts.length; j++) {
            let text = texts[j];
            chats.push(await textService.getTextChat(text.id));
        }
        for (let j = 0; j < medias.length; j++) {
            let media = events[j];
            chats.push(await mediaService.getMediaChat(media.id));
        }
        for (let j = 0; j < events.length; j++) {
            let event = events[j];
            chats.push(await eventService.getEventResults(event.id, userId));
        }
        for (let j = 0; j < polls.length; j++) {
            let poll = events[j];
            chats.push(await pollService.getPollResults(poll.id, userId));
        }
        chats.sort(function(a, b) {
            return a.message.date.getTime() - b.message.date.getTime();
        });
        channelChats.push({
            id: channel.id,
            name:channel.name,
            chats:chats
        });
    }
    return getResponse(200, channelChats);
}

//Array.prototype.push.apply

const consolidatedService = {
    getChatConsolidated : getChatConsolidated
};

module.exports = consolidatedService;