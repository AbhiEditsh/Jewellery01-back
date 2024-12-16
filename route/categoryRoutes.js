const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:categoryId/products", categoryController.getProductsByCategory);

module.exports = router;
