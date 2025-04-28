module.exports = {
    development: {
      client: 'pg',
      connection: {
        user: "postgres",
        password: "root",
        host: "localhost",
        port: 5432,
        database: "db",

      },
      migrations: {
        directory: '../migrations'
      }
    }
  };
