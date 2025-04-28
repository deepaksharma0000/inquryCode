const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
router.use(cors());
router.use(express.json());
// const authController = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware');
const {checkPermissions} = require('../../utils/admins')
const { modules, permissions } = require('../../utils/constants')

const {postRegister , putUpdateUser, postLogin, getUsers, getInquiry, updateStatus, postImageUpload} = require("./controller")


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
  

  
// Auth Routes
router.post('/login', postLogin);
router.post('/adduser', checkPermissions(modules.slug,permissions.super_admin),postRegister);
router.put('/updateuser/:id',checkPermissions(modules.slug,permissions.super_admin), putUpdateUser);
router.get('/getusers', checkPermissions(modules.slug,permissions.super_admin), getUsers);
router.get('/getinquiry', checkPermissions(modules.slug,permissions.super_admin), getInquiry);
router.put('/updatestatus', checkPermissions(modules.slug,permissions.super_admin), updateStatus);
// Upload API (single or multiple files)
router.post('/upload',checkPermissions(modules.slug,permissions.super_admin), upload.array('image', 10), postImageUpload);

module.exports = router;
