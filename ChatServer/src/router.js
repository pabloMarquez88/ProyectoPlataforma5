const express = require('express');
const userController = require('./controllers/user.controller');
const chatController = require('./controllers/chat.controller');
const router = express.Router();
const version = 'v1';

router.post(`/${version}/user/`, userController.test);
router.post(`/${version}/user/channel`, userController.test2);

/**
 * Chat routes
 */
router.post(`/${version}/chat/event`, chatController.postEvent);
router.put(`/${version}/chat/event`, chatController.updateEventStatus);
router.put(`/${version}/chat/event/reply`, chatController.replyToEvent);
router.get(`/${version}/chat/event`, chatController.getEvent);

router.post(`/${version}/chat/poll`, chatController.postPoll);
router.put(`/${version}/chat/poll/reply`, chatController.handlePollReply);
router.put(`/${version}/chat/poll`, chatController.updatePollStatus);
router.get(`/${version}/chat/poll`, chatController.getPoll);

router.post(`/${version}/chat/media`, chatController.postMedia);

router.post(`/${version}/chat/text`, chatController.postText);

router.get(`/${version}/chat/`, chatController.getConsolidated);





module.exports = {router, version};
