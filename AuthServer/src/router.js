const express = require('express');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');
const router = express.Router();
const version = 'v1';

router.post(`/${version}/user/`, userController.signUp);
router.post(`/${version}/user/validate`, userController.signUpValidation);

router.post(`/${version}/auth/signIn`, authController.signIn);
router.post(`/${version}/auth/anonSignIn`, authController.anonymousSignIn);
router.post(`/${version}/auth/validateToken`, authController.validateToken);

module.exports = {router, version};
