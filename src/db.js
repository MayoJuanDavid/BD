const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "Lalala123",
  host: "localhost",
  port: "5432",
  database: "Tasks",
});
module.exports = pool;
