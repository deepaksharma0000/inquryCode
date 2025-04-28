
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Knex = require("../../config/knex")
const pool = require('.././../config/dbConfig')




const postTest = async(req,res) => {
    try {
        const { student_name, contact_no, test_attempt_by, test_marks, created_by } = req.body;
    
        // Basic Validation (optional)
        if (!student_name || !contact_no || !test_attempt_by || test_marks === undefined) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        // Insert into database
        const [newTest] = await Knex('test')
          .insert({
            student_name,
            contact_no,
            test_attempt_by,
            test_marks,
            created_by: created_by || null, // optional
            created_at: Knex.fn.now(),
            updated_at: Knex.fn.now(),
          })
          .returning('*');
    
        res.status(201).json({
          message: 'Test record inserted successfully',
          data: newTest,
        });
    
      } catch (error) {
        console.error('Insert Test Error:', error);
        res.status(500).json({ error: error.message });
      }
    
};

const getTest = async(req,res) => {
    try {
        // get user
        const getQuery = Knex('test')
          .select()
          .returning('*')
          .toString();
        const result = await pool.query(getQuery);
    
        res.status(200).json({
          message: 'Get all Test  successfully',
          results: result.rows,
        });
      } catch (error) {
        console.error('Get Test Error:', error);
        res.status(500).json({ error: error.message });
      }

}


  module.exports = {
    postTest, getTest
  };
  