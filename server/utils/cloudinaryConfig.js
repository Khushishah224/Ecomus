import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dcigrgvjz',
  api_key: '464756737644323',
  api_secret: '4fc2Da5_CR-GswInvINlwNVDSEM',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder', // Cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

export default upload;
