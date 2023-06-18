import knex from 'knex';

export default knex({
  client: "postgresql",
    connection: {
      database: "the-safe",
      user: "localhost",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
});
