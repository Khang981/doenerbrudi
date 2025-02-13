const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2")

const user = process.env.USER;
const password = process.env.PW;
const URL = process.env.DB_URL;
const database = process.env.DATABASE;

const pool = mysql.createPool({
  host: URL,
  user: user,
  password: password,
  database: database
})

module.exports = pool.promise();