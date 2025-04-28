exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.bigIncrements('id').primary();
      table.string('username', 50);
      table.string('first_name', 50);
      table.string('last_name', 50);
      table.string('mobile_number', 50);
      table.string('password', 255);
      table.string('profile_img', 255);
      table.tinyint('role_id', 1);         // you may adjust based on Postgres type
      table.bigInteger('created_by').nullable();
      table.bigInteger('updated_by').nullable();
      table.bigInteger('deleted_by').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  