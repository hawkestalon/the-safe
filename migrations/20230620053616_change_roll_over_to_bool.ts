import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE category ALTER COLUMN roll_over DROP default');
  await knex.raw('ALTER TABLE category DROP COLUMN roll_over');
  await knex.raw('ALTER TABLE category ADD COLUMN roll_over boolean')
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('category', (table) => {
    table.integer('roll_over').alter();
  })
}

