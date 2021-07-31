const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Text = db.text;
const Event = db.event;


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


const eventService = {
    persistEventChat : persistEventChat
};

module.exports = eventService;