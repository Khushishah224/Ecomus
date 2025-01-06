// storage.js
import cloudinary from './cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecomus', // specify folder name in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'],
    },
});

const upload = multer({ storage });

export default upload;
