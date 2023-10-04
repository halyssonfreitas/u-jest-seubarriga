/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('users', (tableBuilder) => {
    tableBuilder.increments('id').primary();
    tableBuilder.string('name').notNullable();
    tableBuilder.string('email').notNullable().unique();
    tableBuilder.string('passwd').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTable('users')
};
