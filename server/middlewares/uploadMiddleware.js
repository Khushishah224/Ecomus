// const multer = require('multer');
import multer from 'multer';
// const path = require('path');
import path from 'path';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage });

export default upload;
