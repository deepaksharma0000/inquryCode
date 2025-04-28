require("dotenv").config({ path: __dirname + "/.env" });

const { Pool } = require("pg");
const pg = require("pg");

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value);
});

const pool = new Pool({
  user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "kothari_clinic",
    // database: "kothari",
});

pool.connect();

pool.on("connect", () => {
  console.log("DB connection...!!!");
});
pool.on("end", () => {
  console.log("DB end connection...!!!");
});
pool.query("SET search_path to 'public';");
module.exports = pool;


