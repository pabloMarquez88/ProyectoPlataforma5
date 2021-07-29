const express = require('express');
const userController = require('./controllers/user.controller');
const router = express.Router();
const version = 'v1';

router.post(`/${version}/user/`, userController.test);
router.post(`/${version}/user/channel`, userController.test2);

module.exports = {router, version};
