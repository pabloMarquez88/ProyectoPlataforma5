const userService = require('../services/user.service');
//const { generateUuid } = require('../utils/uuid.utils');

class userController {
    /*static async signUpValidation(req, res) {
        const { email, username } = req.body;
        const result = await userService.checkDuplicateUsernameOrEmail(username, email);
        res.status(result.status).send(result.message);
    }

    static async signUp(req, res) {
        const { username, email, password, roles } = req.body;
        const result = await userService.createUser(username, email, password, roles);
        res.status(result.status).send(result.message);
    }*/

    static async test(req, res){
        await userService.createChannel();
    }

    static async test2(req, res){
        await userService.selectChannel();
    }

}

module.exports = userController;
