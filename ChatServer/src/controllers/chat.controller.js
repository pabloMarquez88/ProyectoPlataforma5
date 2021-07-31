const chatService = require('../services/chat.service.js');

class chatController{
    static async postText(req, res) {
        let {channelId, text, exist} = req.body;
        if (exist){
            await chatService.persistTextChat(channelId, text);
        }
        res.status(200).send("HOLA");
    }

    static async postEvent(req, res) {

    }

    static async postPoll(req, res) {

    }
    static async postMedia(req, res) {

    }

}

module.exports = chatController;