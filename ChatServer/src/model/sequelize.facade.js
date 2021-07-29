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
db.channel = require("./channel.model.js")(sequelize, Sequelize);
db.media = require("./media.model.js")(sequelize, Sequelize);
db.poll = require("./poll.model.js")(sequelize, Sequelize);
db.text = require("./text.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);

db.user.hasMany(db.channel, {
    foreignKey: 'userId'
})
db.channel.belongsTo(db.user)

db.channel.belongsToMany(db.user,{
    through: "user_channel",
    foreignKey: "channelId",
    otherKey: "userId"
})

db.user.belongsToMany(db.channel,{
    through: "user_channel",
    foreignKey: "userId",
    otherKey: "channelId"
})

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