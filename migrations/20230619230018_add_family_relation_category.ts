import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('category', (table) => {
    table.integer('family_id').references('id').inTable('family');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('category', (table) => {
    table.dropColumn('family_id');
  });
}
