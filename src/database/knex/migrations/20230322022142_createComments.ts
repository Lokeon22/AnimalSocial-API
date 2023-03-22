import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table: Knex.TableBuilder) => {
    table.increments("id");
    table.text("name").notNullable();
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comments");
}
