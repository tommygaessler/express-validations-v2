module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex_emojis',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
