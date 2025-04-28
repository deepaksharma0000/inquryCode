exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
      table.bigIncrements('id').primary();
      table.string('name', 50);
      table.string('slug', 50);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('roles');
  };
  