const {dataBasePool} = require("../config/sequelize.db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dataBasePool.DB,
    dataBasePool.USER,
    dataBasePool.PASSWORD,
    {
        host: dataBasePool.HOST,
        dialect: dataBasePool.dialect,
        operatorsAliases: false,

        pool: {
            max: dataBasePool.pool.max,
            min: dataBasePool.pool.min,
            acquire: dataBasePool.pool.acquire,
            idle: dataBasePool.pool.idle
        }
    }
);

const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.user = require("./user.model.js")(sequelize, Sequelize);
    db.role = require("./role.model.js")(sequelize, Sequelize);

    db.role.belongsToMany(db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
    });
    db.user.belongsToMany(db.role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
    });

    db.ROLES = ["user", "admin", "moderator"];

    db.sequelize.sync({force: false}).then(() => {
        console.log('Drop and Resync Db');
        //initial();
    });

function initial() {
    db.role.create({
        id: 1,
        name: "user"
    });

    db.role.create({
        id: 2,
        name: "moderator"
    });

    db.role.create({
        id: 3,
        name: "admin"
    });
}

module.exports = {db};