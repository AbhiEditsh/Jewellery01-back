const express = require("express");
const router = express.Router();
const inquiryController = require("../controller/ProductInquiry");

router.post("/", inquiryController.createInquiry);
router.get("/", inquiryController.getAllInquiries);
router.get("/:id", inquiryController.getInquiryById);
router.delete("/:id", inquiryController.deleteInquiry);

module.exports = router;
