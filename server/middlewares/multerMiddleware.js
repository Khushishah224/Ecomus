// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'banners', // Folder in Cloudinary
//     allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer, { diskStorage } from 'multer';

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with storage
const upload = multer({ storage,limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;
