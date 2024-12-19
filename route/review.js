const express = require("express");
const router = express.Router();
const ReviewController = require("../controller/reviewController");

router.post("/", ReviewController.createReview);
router.get("/", ReviewController.getReview);
router.delete("/:id", ReviewController.deleteReview);
router.put("/:id", ReviewController.updateReview);

module.exports = router;
