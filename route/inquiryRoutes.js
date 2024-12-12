const express = require('express');
const { createInquiry, getInquiries } = require('../controller/inquiryController');
const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);

module.exports = router;
