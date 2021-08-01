const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Event = db.event;
const User = db.UserChat;


persistEventChat = async(channelId, content, location, dateStart, dateEnd) =>{
    console.log("saving event chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let event = await Event.create({
        content: content,
        location: location,
        status: PROPOSED,
        dateStart: dateStart,
        dateEnd:dateEnd,
        date:Date.now()
    });
    event.setChannel(channel);
    await event.save();
    return getResponse(200, "event saved");
}

updateStatusEventChat = async (channelId, eventId, status) => {
    console.log("update status to event")
    let event = await Event.findOne({
        where: {
            id:eventId
        }
    });
    event.status = status;
    await event.save();
    return getResponse(200, "event saved");
}

addResponseToEvent = async (eventId, userId, reply) => {
    console.log("update event reply")
    let event = await Event.findOne({
        where: {
            id:eventId
        }
    });
    let user  = await User.findOne({
        where: {
            id: userId
        }
    });
    if (reply === "ASSIST"){
        let assistants = await event.getUserassist();
        assistants.push(user);
        event.setUserassist(assistants);
        await  event.save();
    }
    if (reply === "REJECT"){
        let rejections = await event.getUserreject();
        rejections.push(user);
        event.setUserreject(rejections);
        await  event.save();
    }
    return getResponse(200, "event status reply received");
}

const eventService = {
    persistEventChat : persistEventChat,
    updateStatusEventChat : updateStatusEventChat,
    addResponseToEvent : addResponseToEvent
};

module.exports = eventService;