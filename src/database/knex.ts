import knex from 'knex';

export default knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION,
  searchPath: ['knex', 'public'],
});
