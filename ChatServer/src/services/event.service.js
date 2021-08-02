const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Event = db.event;
const User = db.UserChat;


persistEventChat = async(channelId, content, location, dateStart, dateEnd, userId) =>{
    console.log("saving event chat")
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
    let event = await Event.create({
        content: content,
        location: location,
        status: PROPOSED,
        dateStart: dateStart,
        dateEnd:dateEnd,
        date:Date.now(),
        username: user.username
    });
    event.setChannel(channel);
    await event.save();
    channel.addSuscriptions(user);
    await channel.save();
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

isPresent = async (userList, userId) => {
    let isPresent = false;
    userList.forEach((elem, i) =>{
        if (elem.id==userId){
            return true;
        }
    });
    return isPresent;
}

getEventResults = async (eventId, userId) => {
    console.log("get event")
    let event = await Event.findOne({
        where: {
            id:eventId
        }
    });
    let rejects = await event.getUserreject();
    let assist = await event.getUserassist();
    let rejectList = [];
    let assistList = [];
    rejects.forEach((elem, i) =>{
        rejectList.push({
            id:elem.id,
            username:elem.username
        });
    });
    assist.forEach((elem, i) =>{
        assistList.push({
            id:elem.id,
            username:elem.username
        });
    });
    let vote = await isPresent(rejects, userId);
    if (!vote) {
        vote = await isPresent(assist, userId);
    }
    let data = {
        id:event.id,
        text: event.content,
        location: event.location,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        assist: assistList,
        reject: rejectList,
        allowVote:vote,
        date: event.date,
        username: event.username
    }
    return getResponse(200, data);
}

const eventService = {
    persistEventChat : persistEventChat,
    updateStatusEventChat : updateStatusEventChat,
    addResponseToEvent : addResponseToEvent,
    getEventResults : getEventResults
};

module.exports = eventService;