const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

// Product CRUD routes
router.get("/search", productController.searchProducts);
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/related/:id", productController.getRelatedProducts);


module.exports = router;
