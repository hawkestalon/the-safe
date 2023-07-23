import knex from 'knex';

export default knex({
  client: 'postgresql',
  connection: {
    database: 'the-safe',
    user: 'localhost',
    password: 'password',
    typeCast: (field: any, next: any) => {
      if (field.type === 'TINY' && field.length === 1) {
        // Convert tinyint fields to booleans
        return field.string() === '1';
      }
      return next();
    },
  },
  pool: {
    min: 2,
    max: 10,
  },
});
