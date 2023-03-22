import { Knex } from "knex";

const tableName = "users";
export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.text("avatar").defaultTo(null);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.boolean("isadmin").notNullable().defaultTo(0);
    });

    return await knex(tableName).insert({
      id: "1",
      name: "admin",
      email: "admin@admin.com",
      password: "1234567",
      isadmin: true,
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
