exports.up = (knex) => {
  return knex.schema.createTable('emojis', (table) => {
    table.increments();
    table.string('emoji').unique().notNullable();
    table.string('emotion').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('emojis');
};
