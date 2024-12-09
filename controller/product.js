const Product = require("../models/product");
const Category = require("../models/categoryModel");
exports.createProduct = async (req, res) => {
  try {
    const { name, number, description, gender, category, price } = req.body;

    // Fetch and validate category
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }

    // Handle image uploads
    const image = req.files?.image?.[0]?.path || null;
    const imageList = req.files?.imageList?.map((file) => file.path) || [];

    // Create product with category ID and name
    const newProduct = await Product.create({
      name,
      number,
      description,
      gender,
      category: { id: categoryData._id, name: categoryData.name },
      price,
      image,
      imageList,
    });

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name _id"); // Populate category with name and id
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name _id"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) updatedData.image = req.file.path;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Search Products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required and cannot be empty.",
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the search criteria.",
      });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in searchProducts:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRelatedProducts = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const relatedProducts = await Product.find({
      "category.id": product.category.id, 
      _id: { $ne: product._id },
    })
      .limit(4); 


    res.status(200).json({ success: true, relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


