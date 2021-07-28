const sequelize = require('../model/sequelize.facade');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = sequelize.db;
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;

checkDuplicateUsernameOrEmail = async (username, email) => {
    let user = await User.findOne({where: {username: username}})
    console.log("PRIMERA LLAMADA")
    console.log(user);
    if (user !== null){
        return {status: 400, message: "El usuario ya existe"};
    }
    user = await User.findOne({where: {email: email}})
    console.log("SEGUNDA LLAMADA")
    console.log(user);
    if (user !== null){
        return {status: 400, message: "Correo ya usado"};
    }
    return {status: 200, message: "creación permitida"};
};

checkRoleValid = async (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: req.body.roles[i] + " es un rol incorrecto"
                });
                return;
            }
        }
    }
    next();
};

createUser = async (username, email, password, roles) => {
    // Save User to Database
    let validate = checkDuplicateUsernameOrEmail(username, email);
    if ((await validate).status === 200){
        let user = await User.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 8)});
        if (roles){
            let role = await Role.findAll({where : {name: {[Op.or]: roles }}})
            user.setRoles(role);
        } else {
            user.setRoles([1]);
        }
        await user.save();
        console.log("DESPUES DEL SAVE");
        return {status:200, message: "Usuario creado"};
    } else {
        return validate;
    }
}

const verifySignUp = {
    checkRolesExisted: checkRoleValid,
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    createUser : createUser
};

module.exports = verifySignUp;