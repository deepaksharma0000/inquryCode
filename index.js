const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const user = require('./src/user/route');
const inquiryRoutes = require('./src/inquiry/route');
const test = require('./src/test/route')
app.use(cors());
app.use(express.json());

app.use('/api/admin', user);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/test', test);

// Serve the uploads folder
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,'192.168.1.91', () => {
  console.log(`Server running on port ${PORT}`);
});
