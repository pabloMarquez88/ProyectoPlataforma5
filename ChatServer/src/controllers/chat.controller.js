const textService = require('../services/text.service.js');
const pollService = require('../services/poll.service.js');
const eventService = require('../services/event.service.js');
const mediaService = require('../services/media.service.js');
const consolidatedService = require('../services/consolidated.service.js');

class chatController{
    static async postText(req, res) {
        let {channelId, text, userId, exist} = req.body;
        if (exist){
            let result = await textService.persistTextChat(channelId, userId, text);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async postEvent(req, res) {
        let {channelId,content, location, dateStart, dateEnd, exist, userId} = req.body;
        if (exist){
            let result = await eventService.persistEventChat(channelId, content, location, dateStart, dateEnd, userId)
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");

    }

    static async postPoll(req, res) {
        let {channelId, options, exist, text, userId} = req.body;
        if (exist){
            let result = await pollService.persistPollChat(channelId, options, text, exist, userId)
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async postMedia(req, res) {
        let {channelId, base64Image, filename, type, exist, userId} = req.body;
        if (exist){
            let result = await mediaService.persistMediaChat(channelId, base64Image, filename, userId, type);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async updateEventStatus(req, res) {
        let {channelId, eventId, status, exist} = req.body;
        if (exist){
            let result = await eventService.updateStatusEventChat(channelId, eventId, status);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async replyToEvent(req, res) {
        let {eventId, userId, reply, exist} = req.body;
        if (exist){
            let result = await eventService.addResponseToEvent(eventId, userId, reply);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async handlePollReply(req, res) {
        let {pollId, userId, reply, exist} = req.body;
        if (exist){
            let result = await pollService.handlePollReply(pollId, userId, reply);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async updatePollStatus(req, res) {
        let {pollId, status, exist} = req.body;
        if (exist){
            let result = await pollService.updatePollStatus(pollId, status);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async getPoll(req, res) {
        let {pollId, userId, exist} = req.body;
        if (exist){
            let result = await pollService.getPollResults(pollId, userId);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async getEvent(req, res) {
        let {eventId, userId, exist} = req.body;
        if (exist){
            let result = await eventService.getEventResults(eventId, userId);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async getConsolidated(req, res) {
        let {userId, exist} = req.body;
        if (exist){
            let result = await consolidatedService.getChatConsolidated(userId);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }


}

module.exports = chatController;