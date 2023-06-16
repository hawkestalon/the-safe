import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('family', (table) => {
    table.increments('id').primary({ constraintName: 'family_primary_key' });
    table.string('name').notNullable();
    table.timestamps();
  });

  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary({ constraintName: 'role_primary_key' });
    table.string('role').notNullable();
  });

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary({ constraintName: 'user_primary_key' });
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.integer('familiy_id').references('id').inTable('family').notNullable();
    table.integer('role_id').references('id').inTable('roles').notNullable();
  });

  await knex.schema.createTable('category', (table) => {
    table.increments('id').primary({ constraintName: 'category_primary_key' });
    table.string('name').notNullable();
    table.tinyint('roll_over').defaultTo(1);
  });

  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary({ constraintName: 'transaction_primary_key' });
    table.integer('category_id').references('id').inTable('category').notNullable();
    table.double('total').notNullable();
    table.string('description');
    table.string('place_of_purchase').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('family');
  await knex.schema.dropTableIfExists('roles');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('category');
  await knex.schema.dropTableIfExists('transactions');
}

