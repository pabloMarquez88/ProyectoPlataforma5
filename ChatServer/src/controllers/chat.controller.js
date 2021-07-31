const textService = require('../services/text.service.js');
const pollService = require('../services/poll.service.js');
const eventService = require('../services/event.service.js');
const mediaService = require('../services/media.service.js');

class chatController{
    static async postText(req, res) {
        let {channelId, text, exist} = req.body;
        if (exist){
            let result = await textService.persistTextChat(channelId, text);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

    static async postEvent(req, res) {
        let {channelId,content, location, dateStart, dateEnd, exist} = req.body;
        if (exist){
            let result = await eventService.persistEventChat(channelId, content, location, dateStart, dateEnd)
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");

    }

    static async postPoll(req, res) {
        let {channelId, options, exist} = req.body;
        if (exist){
            let result = await pollService.persistPollChat(channelId, options, exist)
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }
    static async postMedia(req, res) {
        let {channelId, base64Image, filename, type, exist} = req.body;
        if (exist){
            let result = await mediaService.persistMediaChat(channelId, base64Image, filename, type);
            res.status(result.status).send(result.message);
            return;
        }
        res.status(200).send("HOLA");
    }

}

module.exports = chatController;