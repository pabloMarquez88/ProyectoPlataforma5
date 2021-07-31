const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Poll = db.poll;

persistPollChat = async(channelId, options, exist) =>{
    console.log("saving poll chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let poll = await Poll.create({
        options: options,
        date: Date.now(),
        status: PROPOSED
    });
    poll.setChannel(channel);
    await poll.save();
    return getResponse(200, "chat poll saved");
}

const pollService = {
    persistPollChat : persistPollChat
};

module.exports = pollService;