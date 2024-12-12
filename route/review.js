const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/reviewController');
const { upload } = require('../config/multerConfig');

// POST route to create a testimonial
router.post('/', upload,ReviewController.createReview);
router.get('/', ReviewController.getReview);

module.exports = router;
