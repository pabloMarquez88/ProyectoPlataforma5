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

db.UserChat = require("./userChat.model.js")(sequelize, Sequelize);
db.channel = require("./channel.model.js")(sequelize, Sequelize);
db.media = require("./media.model.js")(sequelize, Sequelize);
db.poll = require("./poll.model.js")(sequelize, Sequelize);
db.text = require("./text.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);


/**
 * Relation for channel user ownership
 */
db.UserChat.hasMany(db.channel, {
    as : 'ownchats'
});
db.channel.belongsTo(db.UserChat);

/**
 * Relation for channel user subscription
 */
db.channel.belongsToMany(db.UserChat,{
    through: "userschats_channel",
    as: 'suscriptions'
});

db.UserChat.belongsToMany(db.channel,{
    through: "userschats_channel",
    as:"suscriptions"
});

/**
 * Relation for channel text message
 */
db.channel.hasMany(db.text, {
    as : 'texts'
});
db.text.belongsTo(db.channel);

/**
 * Relation for channel event message
 */
db.channel.hasMany(db.event, {
    as : 'events'
});
db.event.belongsTo(db.channel);

db.event.belongsToMany(db.UserChat, {
    through: "userschats_event",
    as: 'eventresponses'
});
db.UserChat.belongsToMany(db.event, {
    through: "userschats_event",
    as: 'userevents'
});

/**
 * Relation for channel poll message
 */
db.channel.hasMany(db.poll, {
    as : 'polls'
});
db.poll.belongsTo(db.channel);

db.poll.belongsToMany(db.UserChat, {
    through: "userschats_poll",
    as: 'pollresponses'
});
db.UserChat.belongsToMany(db.poll, {
    through: "userschats_poll",
    as: 'polls'
});

/**
 * Relation for channel media message
 */
/*db.channel.hasMany(db.media, {
    as : 'medias'
});
db.media.belongsTo(db.channel);*/



db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    //initial();
});

module.exports = {db};