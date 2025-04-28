exports.up = function(knex) {
    return knex.schema.createTable('inquiry_form', table => {
      table.bigIncrements('id').primary();
      table.string('name', 50);
      table.string('gender', 50);
      table.string('email_id', 100);
      table.string('mobile_no', 50);
      table.string('category', 50);
      table.date('date_of_birth');
      table.string('school_name', 255);
      table.string('subject', 50);
      table.string('city', 50);
      table.string('address', 255);
      table.string('assigned_to', 50);
      table.string('status', 50).defaultTo('inreview');
      table.bigInteger('created_by').unsigned();
      table.bigInteger('updated_by').unsigned();
      table.bigInteger('deleted_by').unsigned();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('inquiry_form');
  };
  