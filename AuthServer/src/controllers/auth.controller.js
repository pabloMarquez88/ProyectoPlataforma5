const sequelize = require('../model/sequelize.facade');
const db = sequelize.db;
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signIn = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "usuario no encontrado" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "password incorrecto"
                });
            }

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                var token = jwt.sign({ id: user.id, roles:authorities, username:user.username, exist: true }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.anonymousSignIn = (req, res) => {
    var token = jwt.sign({ id: -1, roles:[],username:req.body.email, exist: false }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
        id: req.body.email,
        username: req.body.email,
        email: req.body.email,
        roles: [],
        accessToken: token
    });
};

exports.validateToken = (req, res) => {
    const { token } = req.body;
    try{
        let data = jwt.verify(token, config.secret);
        res.status(200).send(data);
    } catch(err) {
        res.status(200).send(err.message);
    }
}