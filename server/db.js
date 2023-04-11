require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: 'todoapp'
});
module.exports = pool;