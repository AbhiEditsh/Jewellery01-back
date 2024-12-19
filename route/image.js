const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
require("dotenv").config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Setup
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|webp|doc/;
    const isValid = allowedTypes.test(file.mimetype.toLowerCase());

    if (isValid) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .png, .jpg, .jpeg, .pdf, .webp, and .doc formats are allowed!"
        )
      );
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// Upload image to Cloudinary
router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads", // You can change the folder name as needed
        public_id: Date.now() + "-" + req.file.originalname, // Unique public ID for each file
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error uploading to Cloudinary", error });
        }
        res.status(200).json({
          url: result.secure_url, // Cloudinary URL of the uploaded file
          public_id: result.public_id, // Cloudinary public ID
          message: "Image uploaded successfully",
        });
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer); // Push file buffer into the stream
    bufferStream.push(null); // End the stream
    bufferStream.pipe(uploadStream); // Pipe it to Cloudinary
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});

// Upload multiple images to Cloudinary
router.post("/upload-multiple", upload.array("images", 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const uploadResults = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "uploads",
                public_id: Date.now() + "-" + file.originalname,
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }
                resolve(result);
              }
            );

            const bufferStream = new Readable();
            bufferStream.push(file.buffer);
            bufferStream.push(null);
            bufferStream.pipe(uploadStream);
          })
      )
    );

    const uploadedImages = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    res.status(200).json({
      success: true,
      images: uploadedImages,
      message: "Images uploaded successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});

module.exports = router;
