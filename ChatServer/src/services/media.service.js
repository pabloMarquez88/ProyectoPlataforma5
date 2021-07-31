const sequelize = require('../model/sequelize.facade');
const {getResponse} = require('../utils/common.util');
const db = sequelize.db;
const Channel = db.channel;
const Media = db.media;
const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;



persistMediaChat = async(channelId, base64Image, filename, type) =>{
    console.log("saving media chat")
    let channel = await Channel.findOne({
        where: {
            id: channelId
        }
    });
    let media = await Media.create({
        data: base64Image,
        name: filename,
        type: type,
        date: Date.now()
    });
    media.setChannel(channel);
    await media.save();
    return getResponse(200, "chat media saved");
}


const mediaService = {
    persistMediaChat : persistMediaChat
};

module.exports = mediaService;