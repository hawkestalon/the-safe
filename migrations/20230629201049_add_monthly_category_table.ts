import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('monthly_category', (table) => {
    table.integer('month');
    table.integer('year');
    table.double('total');
    table.double('current');
    table.integer('category_id').references('id').inTable('category');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('monthly_category');
}

