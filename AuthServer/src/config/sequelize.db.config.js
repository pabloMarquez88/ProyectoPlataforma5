const dataBasePool = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin",
    DB: "plataforma5_final",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};


module.exports = {dataBasePool};