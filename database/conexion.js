const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  allowExitOnIdle: true
})

module.exports = pool
