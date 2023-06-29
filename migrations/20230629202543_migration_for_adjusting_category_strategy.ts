import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('category', (table) => {
    table.boolean('active');
  });
  await knex.schema.alterTable('monthly_category', (table) => {
    table.increments('id').primary({ constraintName: 'monthly_category_primary' });
  });
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('category_id');
    table.integer('category').references('id').inTable('monthly_category');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('category', (table) => {
    table.dropColumn('category');
  });
  await knex.schema.alterTable('transactions', (table) => {
    table.integer('category_id').references('id').inTable('category');
  });
  await knex.schema.alterTable('monthly_category', (table) => {
    table.dropColumn('id');
  });
}

