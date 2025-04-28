const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Knex = require("../../config/knex")
const pool = require('.././../config/dbConfig')

const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenUtils');


// const postRegister = async (req, res) => {
//   try {
//     const { username, password, first_name, last_name, mobile_number, role_id } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [newUser] = await Knex('users')
//       .insert({
//         username,
//         password: hashedPassword,
//         first_name,
//         last_name,
//         mobile_number,
//         role_id,
//       })
//       .returning('*');

//     const accessToken = generateAccessToken(newUser.id);
//     const refreshToken = generateRefreshToken(newUser.id);

//     res.status(201).json({
//       message: 'User registered successfully',
//       accessToken,
//       refreshToken,
//       user: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const postRegister = async (req, res) => {
  try {
    const { username, email_id, password, first_name, last_name, mobile_number, role_id } = req.body;

    // Check if username or email already exists
    const existingUser = await Knex('users')
      .where('username', username)
      .orWhere('email_id', email_id)
      .first();

    if (existingUser) {
      return res.status(400).json({
        message: 'Username or Email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [newUser] = await Knex('users')
      .insert({
        username,
        email_id,
        password: hashedPassword,
        first_name,
        last_name,
        mobile_number,
        role_id,
      })
      .returning('*');

    //  Generate tokens
    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    //  Send response
    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const putUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email_id, first_name, last_name, mobile_number, role_id } = req.body;

    //  Check if the user with this ID exists
    const userToUpdate = await Knex('users').where({ id }).first();

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found with this ID' });
    }

    // //  Check for username or email conflict in other users
    // const conflictUser = await Knex('users')
    //   .where(function () {
    //     this.where('username', username).orWhere('email_id', email_id);
    //   })
    //   .andWhereNot('id', id)
    //   .first();

    // if (conflictUser) {
    //   return res.status(400).json({
    //     message: 'Username or Email already exists for another user',
    //   });
    // }

    //  Proceed with update
    const [updatedUser] = await Knex('users')
      .where({ id })
      .update({
        username,
        email_id,
        first_name,
        last_name,
        mobile_number,
        role_id,
        updated_at: Knex.fn.now(),
      })
      .returning('*');

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// const putUpdateUser = async (req, res) => {
//   try {
//     const { id } = req.params; // Assuming user ID will come in URL params
//     const { username, first_name, last_name, mobile_number, role_id } = req.body;

//     // Update user
//     const updatedRows = await Knex('users')
//       .where({ id })
//       .update({
//         username,
//         first_name,
//         last_name,
//         mobile_number,
//         role_id,
//         updated_at: Knex.fn.now() // update timestamp (optional)
//       })
//       .returning('*');

//     if (updatedRows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const updatedUser = updatedRows[0];

//     res.status(200).json({
//       message: 'User updated successfully',
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error('Update User Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// Login user

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Prepare query using Knex
    const findUserQuery = Knex('users')
      .where({ username })
      .first()
      .toString();

    // Execute with pool.query
    const result = await pool.query(findUserQuery);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async(req,res)=>{
  try {
    // get user
    const getQuery = Knex('users')
      .select()
      .returning('*')
      .toString();
    const result = await pool.query(getQuery);

    res.status(200).json({
      message: 'Get all User successfully',
      results: result.rows,
    });
  } catch (error) {
    console.error('Get User Error:', error);
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

const updateStatus = async(req,res)=>{
  try {   

    const { id, status } =req.body;
    // Update Student Inquiry
    const getQuery = Knex('inquiry_form')
      .update('status', status)
      .where({id})
      .returning('*')
      .toString();
    const result = await pool.query(getQuery);

    res.status(200).json({
      message: 'Update Status successfully',
      results: result.rows,
    });
  } catch (error) {
    console.error('Update User Error:', error);
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

    const result = await Knex('users')
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


module.exports ={ postRegister ,putUpdateUser,  postLogin, getUsers, getInquiry, updateStatus, postImageUpload};
