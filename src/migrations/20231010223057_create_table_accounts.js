/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('accounts', (tableBuilder) => {
    tableBuilder.increments('id').primary();
    tableBuilder.string('name').notNullable();
    tableBuilder.integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('accounts');
};
