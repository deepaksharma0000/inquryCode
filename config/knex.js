require("dotenv").config({ path: __dirname + "/.env" });
const { knex } = require("knex");

const Knex = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "kothari_clinic",
    // database: "kothari",
  },
});

module.exports = Knex;
