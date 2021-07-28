const express = require('express');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');
const router = express.Router();
const version = 'v1';

/**
 * @swagger
 * /user:
 *    post:
 *      description: Use to return asdasdall customers
 *    parameters:
 *      - name: username
 *        in: query
 *        description: username
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: query
 *        description: email
 *        required: true
 *        schema:
 *         type: string
 *         format: string
 *      - name: password
 *        in: query
 *        description: password
 *        required: true
 *        schema:
 *         type: string
 *         format: string
 *      - name: roles
 *        in: query
 *        description: roles array
 *        required: false
 *        schema:
 *         type: array
 *         format: string
 *    responses:
 *      '200':
 *        description: Usuario creado
 */
router.post(`/${version}/user/`, userController.signUp);
router.post(`/${version}/user/validate`, userController.signUpValidation);

router.post(`/${version}/auth/signIn`, authController.signIn);
router.post(`/${version}/auth/anonSignIn`, authController.anonymousSignIn);
router.post(`/${version}/auth/validateToken`, authController.validateToken);

module.exports = {router, version};
