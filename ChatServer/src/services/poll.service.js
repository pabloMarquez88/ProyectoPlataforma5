const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const {PROPOSED} = require('../utils/constant')
const db = sequelize.db;
const Channel = db.channel;
const Poll = db.poll;
const User = db.UserChat;

persistPollChat = async(channelId, options, exist) =>{
    console.log("saving poll chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let optionInit = options.split(",").join(":0,") + ":0";
    let poll = await Poll.create({
        options: optionInit,
        date: Date.now(),
        status: PROPOSED,
        openOptions: ''
    });
    poll.setChannel(channel);
    await poll.save();
    return getResponse(200, "chat poll saved");
}

handlePollReply = async(pollId, userId, reply) => {
    console.log("poll reply received")
    let poll = await Poll.findOne({
        where: {
            id: pollId
        }
    });
    let options = poll.options.split(",");
    let isInOptions = (poll.options.indexOf(reply) != -1);
    if (!isInOptions){
        let openOptions = poll.openOptions.split(",");
        if (poll.openOptions.length === 0){
            openOptions = [];
        }
        let isInOpenOptions = (poll.openOptions.indexOf(reply) != -1);
        if (!isInOpenOptions){
            openOptions.push(reply + ":1");
            poll.openOptions = openOptions.join(",");
        } else {
            let newVotes = []
            openOptions.forEach((x, i) => {
                if (x.indexOf(reply) != -1){
                    let vote = parseInt(x.split(":")[1]) + 1
                    newVotes.push(reply+":"+vote);
                } else {
                    newVotes.push(x);
                }
            });
            poll.openOptions = newVotes.join(",");
        }
    } else {
        let newVotes = []
        options.forEach((x, i) => {
            if (x.indexOf(reply) != -1){
                let vote = parseInt(x.split(":")[1]) + 1
                newVotes.push(reply+":"+vote);
            } else {
                newVotes.push(x);
            }
        });
        poll.options = newVotes.join(",");
    }
    let user  = await User.findOne({
        where: {
            id: userId
        }
    });
    poll.addPollresponses(user);
    await poll.save();
    return getResponse(200, "poll options saved");
}

updatePollStatus = async (pollId, status) => {
    console.log("update status to poll")
    let poll = await Poll.findOne({
        where: {
            id:pollId
        }
    });
    poll.status = status;
    await poll.save();
    return getResponse(200, "poll status updated");
}

const pollService = {
    persistPollChat : persistPollChat,
    handlePollReply: handlePollReply,
    updatePollStatus:updatePollStatus
};

module.exports = pollService;