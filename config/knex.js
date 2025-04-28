require("dotenv").config({ path: __dirname + "/.env" });
const { knex } = require("knex");

const Knex = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db",
 
  },
});

module.exports = Knex;
