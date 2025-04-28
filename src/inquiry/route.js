const express = require('express');
const multer = require('multer');
const router = express.Router();
const cors = require('cors');
const path = require('path');
router.use(cors());

// const auth = require('../../utils/auth')


const { postInquiry, updateInquiry, getInquiry, postImageUpload } = require("./controller")

// const upload = multer({
//     limits: {
//       fieldSize: 500 * 1000_000,
//     },
//     fileFilter(_req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpeg|jpg|mp4)$/i)) {
//         return cb(Error('Unsupported file uploaded to server'));
//       }
  
//       return cb(null, true);
//     }
//   });
  
//   const uploadMultiple = upload.fields([
//     { name: "image" }, 
//   ]);

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save files here
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique name
    }
  });
  
  // Your custom multer config
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 500 * 1000_000, // 500 MB
    },
    fileFilter(_req, file, cb) {
      if (!file.originalname.match(/\.(png|jpeg|jpg|mp4)$/i)) {
        return cb(Error('Unsupported file uploaded to server'));
      }
      return cb(null, true);
    }
  });
  
// Upload API (single or multiple files)
router.post('/upload', upload.array('image', 10), postImageUpload);
  


// Auth Routes
router.post('/inquiry', postInquiry);
router.put('/inquiries/:id', updateInquiry);
router.get('/getinquiry', getInquiry);


module.exports = router;
