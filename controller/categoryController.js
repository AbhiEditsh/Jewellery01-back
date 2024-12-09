const product = require("../models/product");
const Category = require("../models/categoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category ID
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category existence
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find products by category ID
    const products = await product.find({
      "category.id": categoryId, 
    });

    // If no products found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Return products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
