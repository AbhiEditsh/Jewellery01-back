const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({
  storage,
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'imageList', maxCount: 10 },
  { name: 'clientImage', maxCount: 1 },
]);

module.exports = { upload };
