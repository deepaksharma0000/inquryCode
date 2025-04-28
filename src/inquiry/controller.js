const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Knex = require("../../config/knex")
const pool = require('.././../config/dbConfig')
const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenUtils');


// @desc    Create new Inquiry
const postInquiry = async (req, res) => {
  try {
    const {
      name,
      gender,
      email_id,
      mobile_no,
      category,
      date_of_birth,
      school_name,
      subject,
      city,
      address,
      assigned_to,
      created_by,
      updated_by,
      deleted_by,
      admission_ref_by,
      father_name,
      status,
    } = req.body;

    // Build insert query using Knex
    const insertQuery = Knex('inquiry_form')
      .insert({
        name,
        gender,
        email_id,
        mobile_no,
        category,
        date_of_birth,
        school_name,
        subject,
        city,
        address,
        assigned_to,
        created_by,
        updated_by,
        deleted_by,
        admission_ref_by,
        father_name,
        status: status || "inreview"
      })
      .returning('*')
      .toString();

    // Execute the query
    const result = await pool.query(insertQuery);

    const inquiry = result.rows[0];

    res.status(201).json({
      message: 'Inquiry created successfully',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @desc    Update an existing Inquiry by ID
const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      gender,
      email_id,
      mobile_no,
      category,
      date_of_birth,
      school_name,
      subject,
      city,
      address,
      assigned_to,
      updated_by,
      deleted_by,
      status // optional status update
    } = req.body;

    // Build update query using Knex
    const updateQuery = Knex('inquiry_form')
      .update({
        name,
        gender,
        email_id,
        mobile_no,
        category,
        date_of_birth,
        school_name,
        subject,
        city,
        address,
        assigned_to,
        updated_by,
        deleted_by,
        status
      })
      .where({ id })
      .returning('*')
      .toString();

    // Execute the query
    const result = await pool.query(updateQuery);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.status(200).json({
      message: 'Inquiry updated successfully',
      inquiry: result.rows[0],
    });

  } catch (error) {
    console.error('❌ Update Error:', error);
    res.status(500).json({ error: error.message });
  }
};


const getInquiry = async (req,res)=>{
  try {   
    // get STudent Inquiry

    const limit = 25;
    const offset = req.params.page ? parseInt(req.params.page) - 1 : 0;
    let totalcount = 0;
    let pages = 0;
    const qsearch = req.query.q || "";


    const inquiry_count = Knex("inquiry_form")
      .count("inquiry_form.id")
      .returning('*')
      .toString();
    const res_inquirycount = await pool.query(inquiry_count);
    totalcount = res_inquirycount.rows[0]["count"];
    pages = Math.ceil(totalcount / limit);


    const getQuery = Knex('inquiry_form')
      .select('*')
      .where(function () {
        if (`${qsearch}` === "") {
          this.offset(offset * limit);
          this.limit(limit);
        } else {
          this.where("status", "ILIKE", `%${qsearch}%`);
        }
      })
      .offset(offset * limit)
      .limit(limit)
      .toString();
    const result = await pool.query(getQuery);

    res.status(200).json({
      message: 'Get all Inquiry successfully',
      results: result.rows,
      numberOfPages: pages,
      total: totalcount,
    });
  } catch (error) {
    console.error('Get Inquiry Error:', error);
    res.status(500).json({ error: error.message });
  }

};

const postImageUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    if (!req.body.id || req.body.id.length === 0) {
      return res.status(400).send('No id passed.');
    }

    const userId = req.body.id; // get id correctly

    // Assuming you want to use first uploaded file for profile
    const file = req.files[0];

    const baseUrl = req.protocol + '://' + req.get('host'); // http://localhost:3000
    const fullImageUrl = `${baseUrl}/uploads/${file.filename}`;

    const result = await Knex('inquiry_form')
      .where('id', userId)
      .update({ profile_img: fullImageUrl })
      .returning('*');

    res.send({
      message: 'Profile image uploaded and saved!',
      data: result
    });

  } catch (error) {
    console.error('Error uploading file(s):', error);
    res.status(500).send('Server error');
  }
};



module.exports = {
  postInquiry,
  updateInquiry,
  getInquiry,
  postImageUpload
};



