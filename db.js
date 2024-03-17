const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Assignment3",
  password: "zh2131AA",
  port: 5432,
});

module.exports = pool;
