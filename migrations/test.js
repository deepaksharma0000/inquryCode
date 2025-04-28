exports.up = function(knex) {
  return knex.schema.createTable('test', table => {
    table.bigIncrements('id').primary();
    table.string('student_name', 100);
    table.string('contact_no', 50);
    table.string('test_attempt_by', 100);
    table.integer('test_marks').unsigned(); // assuming marks are positive numbers
    table.bigInteger('created_by').nullable();
    table.bigInteger('updated_by').nullable();
    table.bigInteger('deleted_by').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('test');
};
