/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("practices", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.integer("poolLength").notNullable();
    table.boolean("units").notNullable();
    table.integer("duration").notNullable();
    table.time("start time");
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("practices");
};
