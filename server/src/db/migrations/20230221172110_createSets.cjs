/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("sets", (table) => {
    table.bigIncrements("id");
    table.integer("amount").notNullable();
    table.integer("distance").notNullable();
    table.string("stroke").notNullable();
    table.integer("interval").notNullable();
    table.string("notes");
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id");
    table.bigInteger("practiceId").notNullable().unsigned().index().references("practices.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("sets");
};
