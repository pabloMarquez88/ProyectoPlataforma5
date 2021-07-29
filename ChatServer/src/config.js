// Check for mandatory environment variables
const required = [
  'NODE_ENV',
  'DB_MAIN_HOST',
  'DB_MAIN_USER',
  'DB_MAIN_PASS',
  'DB_MAIN_NAME'
];

/*required.forEach(param => {
  if (!process.env[param]) {
    throw new Error(`Environment parameter ${param} is missing`);
  }
});*/

const config = {
  env: 'local'//process.env['NODE_ENV']
};

const mainDatabase = {
  host: 'localhost',
  user: 'root',
  pass: 'admin',
  name: 'plataforma5_final'
};

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

/*const mainDatabase = {
  host: process.env['DB_MAIN_HOST'],
  user: process.env['DB_MAIN_USER'],
  pass: process.env['DB_MAIN_PASS'],
  name: process.env['DB_MAIN_NAME']
};*/

module.exports = { config, mainDatabase, dataBasePool};
