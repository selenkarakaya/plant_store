const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

/*
This file acts like a central **database connection module**. You can access it from anywhere in your application to run database queries.
Look controllers
*/
