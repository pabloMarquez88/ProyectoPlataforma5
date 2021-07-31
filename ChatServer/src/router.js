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
router.post(`/${version}/chat/text`, chatController.postText);
router.post(`/${version}/chat/event`, chatController.postEvent);
router.post(`/${version}/chat/poll`, chatController.postPoll);
router.post(`/${version}/chat/media`, chatController.postMedia);

module.exports = {router, version};
