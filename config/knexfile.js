module.exports = {
    development: {
      client: 'pg',
      connection: {
        user: "postgres",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "kothari_clinic",
        // database: "kothari",
      },
      migrations: {
        directory: '../migrations'
      }
    }
  };