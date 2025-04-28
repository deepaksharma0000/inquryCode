const express = require('express');
const router = express.Router();

// const auth = require('../../utils/auth')


const { postTest, getTest} = require("./controller")

// Auth Routes
router.post('/posttest', postTest);
router.get('/gettest', getTest);


module.exports = router;
