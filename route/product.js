const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig");
const productController = require("../controller/product");
// Routes

router.get("/search", productController.searchProducts);
router.post("/", upload, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", upload, productController.updateProduct); // Handles image and imageList
router.delete("/:id", productController.deleteProduct);
router.get("/related/:id", productController.getRelatedProducts);
module.exports = router;
